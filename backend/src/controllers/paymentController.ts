import type { Request, Response, NextFunction } from "express";
import { createIntent as createStripeIntent } from "../lib/paymentService";
import stripe from "../config/stripe";
interface CreatePaymentIntentBody {
  amount: number; // cents
  currency?: string;
  customer?: { name?: string; email?: string };
  meta?: Record<string, string>; // ✅ allow metadata (serviceId, reference, etc.)
}

function isValidAmount(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}

export async function createPaymentIntent(
  req: Request<{}, {}, CreatePaymentIntentBody>,
  res: Response,
  next: NextFunction
) {
  try {
    const { amount, currency = "aud", customer = {}, meta = {} } = req.body;

    if (!isValidAmount(amount)) {
      return res.status(400).json({
        success: false,
        message: "amount must be an integer in smallest currency unit (e.g., cents).",
      });
    }

    const paymentIntent = await createStripeIntent({ amount, currency, customer, meta });

    return res.status(201).json({
      success: true,
      data: {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
      },
    });
  } catch (error) {
    return next(error);
  }
}


export async function confirmPaymentResult(req: Request, res: Response) {
    try {
      const { paymentIntentId } = req.body as { paymentIntentId?: string };
  
      if (!paymentIntentId) {
        return res.status(400).json({
          success: false,
          message: "paymentIntentId is required",
        });
      }
  
      const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
  
      if (pi.status === "succeeded") {
        return res.status(200).json({
          success: true,
          message: "Payment successful",
          data: {
            paymentIntentId: pi.id,
            status: pi.status,
            amount: pi.amount,
            currency: pi.currency,
            paidAt: new Date().toISOString(),
            receiptEmail: pi.receipt_email ?? null,
          },
        });
      }
  
      return res.status(402).json({
        success: false,
        message: "Payment not completed",
        data: {
          paymentIntentId: pi.id,
          status: pi.status,
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to verify payment",
      });
    }
  }