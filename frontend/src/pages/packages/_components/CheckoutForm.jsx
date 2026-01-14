import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
const CORE = import.meta.env.VITE_API_URL;

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${CORE}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 1000 }),
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/success",
      },
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}>PrePay</button>
    </form>
  );
}

export default CheckoutForm;
