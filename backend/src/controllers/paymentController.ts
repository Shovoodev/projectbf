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
