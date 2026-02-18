import { useEffect, useMemo, useState } from "react";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const CORE = import.meta.env.VITE_API_URL;
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = STRIPE_PUBLISHABLE_KEY ? loadStripe(STRIPE_PUBLISHABLE_KEY) : null;

const cardElementOptions = {
  style: {
    base: { fontSize: "16px", color: "#111827", "::placeholder": { color: "#9ca3af" } },
    invalid: { color: "#dc2626" },
  },
};

function StripeCheckoutForm({ amountCents, clientSecret, setPaying, setError, setSuccessInfo }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setPaying(true);
    setError(null);

    const card = elements.getElement(CardElement);
    if (!card) {
      setPaying(false);
      setError("Card input is not ready yet.");
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
      return_url: `${window.location.origin}/payment-complete`,
    });

    if (error) {
      setError(error.message || "Payment failed");
      setPaying(false);
      return;
    }

    setSuccessInfo({
      message: `Payment submitted. Status: ${paymentIntent?.status ?? "unknown"}`,
      paymentIntentId: paymentIntent?.id,
    });
    setPaying(false);
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-gray-300 rounded-lg p-3">
        <CardElement options={cardElementOptions} />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
      >
        Pay AUD {(amountCents / 100).toFixed(2)}
      </button>
    </form>
  );
}

export default function PaynowPage({ amount, serviceId }) {
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [amountCents, setAmountCents] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function init() {
      try {
        setLoading(true);
        setError(null);
        setSuccessInfo(null);

        if (!CORE) throw new Error("Missing VITE_API_URL");
        if (!stripePromise) throw new Error("Missing VITE_STRIPE_PUBLISHABLE_KEY");
        let cents = Number.isFinite(amount) ? Number(amount) : 0;
        let email

        if (!cents && serviceId) {
          const detailsRes = await fetch(`${CORE}/service-details`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: serviceId }),
          });
          const detailsJson = await detailsRes.json();

          if (!detailsRes.ok) {
            throw new Error(detailsJson?.message || "Failed to load service-details");
          }

          email = detailsJson?.data?.email || email;
          const totalPrice = Number(detailsJson?.data?.totalPrice ?? 0);
          cents = Math.round(totalPrice * 100);
        }

        if (!cents || cents < 50) {
          throw new Error("Invalid payment amount. Minimum is 50 cents.");
        }

        // 2) Create payment intent using email + totalPrice
        const intentRes = await fetch(`${CORE}/create-payment-intent`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: cents,
            currency: "aud",
            customer: { email },
            meta: { serviceId },
          }),
        });

        const intentJson = await intentRes.json();
        if (!intentRes.ok) {
          throw new Error(intentJson?.message || "Failed to create payment intent");
        }

        const cs = intentJson?.data?.clientSecret;
        if (!cs) throw new Error("Backend did not return clientSecret");

        if (isMounted) {
          setAmountCents(cents);
          setClientSecret(cs);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setError(e?.message || "Init failed");
          setLoading(false);
        }
      }
    }

    init();
    return () => {
      isMounted = false;
    };
  }, [serviceId, amount]);

  const elementsOptions = useMemo(() => ({ appearance: { theme: "stripe" } }), []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (successInfo) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-green-50 border border-green-200 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-800">Payment Successful</h2>
        <p className="mt-2 text-green-700">Your payment has been received.</p>

        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p><strong>Payment ID:</strong> {successInfo.paymentIntentId}</p>
          <p><strong>Status:</strong> {successInfo.status}</p>
          <p><strong>Amount:</strong> {(successInfo.amount / 100).toFixed(2)} {String(successInfo.currency).toUpperCase()}</p>
          <p><strong>Paid At:</strong> {new Date(successInfo.paidAt).toLocaleString()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Elements stripe={stripePromise} options={elementsOptions}>
        <StripeCheckoutForm
          amountCents={amountCents}
          clientSecret={clientSecret}
          setPaying={setPaying}
          setError={setError}
          setSuccessInfo={setSuccessInfo}
        />
      </Elements>

      {paying && <div className="mt-3">Processing…</div>}
      {successInfo && <div className="mt-3 text-green-700">{successInfo.message}</div>}
    </div>
  );
}
