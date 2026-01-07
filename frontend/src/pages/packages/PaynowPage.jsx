// import { useEffect, useState } from "react";
// import { stripePromise } from "../../utility/stripe";
// import CheckoutForm from "./_components/CheckoutForm";
// import { Elements } from "@stripe/react-stripe-js";
// import CORE from "../../components/common/Reusables";

// const PaynowPage = () => {
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     fetch(`${CORE}/prepay-option`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: 2000 }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Stripe response:", data);
//         if (!data.clientSecret) {
//           throw new Error("No clientSecret in response");
//         }
//         setClientSecret(data.clientSecret);
//       })
//       .catch((error) => {
//         console.error("Error fetching client secret:", error);
//         setError(error.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading payment...</p>;
//   if (error) return <p>Error: {error}</p>;
//   if (!clientSecret) return <p>Failed to load payment details</p>;

//   const options = {
//     clientSecret,
//     appearance: {
//       theme: "stripe",
//     },
//   };

//   return (
//     <div>
//       <Elements stripe={stripePromise} options={options}>
//         <CheckoutForm />
//       </Elements>
//     </div>
//   );
// };

// export default PaynowPage;
