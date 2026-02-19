import stripe from "../config/stripe";

export interface CreateIntentPayload {
  amount: number;
  currency?: string;
  customer?: { email?: string };
  meta?: Record<string, string>;
}

export async function createIntent({
  amount,
  currency = "aud",
  customer = {},
  meta = {},
}: CreateIntentPayload) {
  return stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ["card"],
    receipt_email: customer.email || undefined,
    metadata: {
      customerEmail: customer.email || "",
      ...meta,
    },
  });
}
