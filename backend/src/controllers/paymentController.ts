import express from "express";
import Stripe from "stripe";

export const getprePaypayment = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { amount } = req.body;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    console.log({ amount, paymentIntent, stripe });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const paymentReciverMarkPaid = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { paymentIntentId, amount, status } = req.body;

    if (status === "succeeded") {
      console.log("🧾 TEST INVOICE PAID");
      console.log("PaymentIntent:", paymentIntentId);
      console.log("Amount:", amount);

      // TEST ONLY — simulate DB update
      return res.json({
        success: true,
        message: "Invoice marked as PAID (TEST)",
      });
    }

    res.status(400).json({
      success: false,
      message: "Payment not completed",
    });
  } catch (err) {
    console.log(err);
  }
};
