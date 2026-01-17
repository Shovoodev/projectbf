import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../utility/stripe";
import { FaLock, FaCreditCard } from "react-icons/fa";
import CheckoutForm from "./CheckoutForm";

const CORE = import.meta.env.VITE_API_URL;

const PaynowPage = ({ amount = 2000 }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!amount || amount <= 0) return;
    setLoading(true);
    fetch(`${CORE}/prepay-option`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!data.clientSecret) throw new Error("No clientSecret in response");
        setClientSecret(data.clientSecret);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [amount]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-gray-600">Preparing secure payment…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        <p className="font-medium">Payment initialization failed</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!clientSecret) return null;

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#2563eb",
        borderRadius: "10px",
      },
    },
  };

  return (
    <div className="mt-6">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FaCreditCard className="text-blue-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Pay Now</h4>
            <p className="text-sm text-gray-500">
              Complete your payment securely
            </p>
          </div>
        </div>

        {/* Stripe Form */}
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>

        {/* Security Note */}
        <div className="flex items-center gap-2 mt-6 text-sm text-gray-500">
          <FaLock className="text-green-600" />
          <span>Secured by Stripe • PCI-DSS compliant</span>
        </div>
      </div>
    </div>
  );
};

export default PaynowPage;
