import express from "express";
import axios, { AxiosError } from "axios";

const POWERBOARD_BASE_URL =
  process.env.POWERBOARD_BASE_URL ||
  "https://api.preproduction.powerboard.commbank.com.au"; // pre-prod base :contentReference[oaicite:3]{index=3}

export const chargesPayment = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    const secretKey = process.env.POWERBOARD_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({
        message: "Missing POWERBOARD_SECRET_KEY in environment variables",
      });
    }

    // What your frontend should send to your backend:
    // {
    //   "amount": "110",                // string recommended in docs :contentReference[oaicite:4]{index=4}
    //   "currency": "AUD",
    //   "reference": "ORDER-123",
    //   "description": "My order",
    //   "customer": { first_name, last_name, email, reference? },
    //   "payment_source": { vault_token, gateway_id },
    //   "custom_fields": { ...optional }
    // }

    const {
      amount,
      currency = "AUD",
      reference,
      description,
      customer,
      payment_source,
      custom_fields,
    } = req.body ?? {};

    if (
      !amount ||
      !reference ||
      !payment_source?.vault_token ||
      !payment_source?.gateway_id
    ) {
      return res.status(400).json({
        message:
          "Required: amount, reference, payment_source.vault_token, payment_source.gateway_id",
      });
    }

    // Build request exactly in the shape PowerBoard shows for /v1/charges :contentReference[oaicite:5]{index=5}
    const payload = {
      amount: String(amount),
      currency,
      description: description ?? reference,
      reference: String(reference),
      customer: customer
        ? {
            first_name: customer.first_name,
            last_name: customer.last_name,
            reference: customer.reference,
            email: customer.email,
            payment_source: {
              vault_token: payment_source.vault_token,
              gateway_id: payment_source.gateway_id,
            },
          }
        : {
            // If you don't want to collect customer fields, you can still send payment_source under customer
            payment_source: {
              vault_token: payment_source.vault_token,
              gateway_id: payment_source.gateway_id,
            },
          },
      ...(custom_fields ? { custom_fields } : {}),
    };

    const url = `${POWERBOARD_BASE_URL}/v1/charges`; // Create a payment endpoint :contentReference[oaicite:6]{index=6}

    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        // PowerBoard auth uses x-user-secret-key for API keys :contentReference[oaicite:7]{index=7}
        "x-user-secret-key": secretKey,
      },
      timeout: 20000,
    });

    return res.status(201).json({
      message: "Charge created",
      powerboard: response.data,
    });
  } catch (err) {
    const e = err as AxiosError<any>;

    const status = e.response?.status ?? 500;
    const data = e.response?.data;

    console.log("PowerBoard create charge error:", status, data ?? e.message);

    return res.status(status).json({
      message: "Failed to create charge",
      status,
      powerboard_error: data ?? e.message,
    });
  }
};

export const capturePayment = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    const secretKey = process.env.POWERBOARD_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: "Missing POWERBOARD_SECRET_KEY" });
    }

    // You can pass chargeId in URL param: /capture-payment/:id
    const chargeId = req.params.id || req.body?.id;
    if (!chargeId) {
      return res.status(400).json({ message: "Missing charge id" });
    }

    // Optional: amount for partial capture (string recommended)
    // If you omit amount -> captures full authorised amount :contentReference[oaicite:4]{index=4}
    const amount = req.body?.amount;
    const payload = amount ? { amount: String(amount) } : undefined;

    const url = `${POWERBOARD_BASE_URL}/v1/charges/${encodeURIComponent(
      String(chargeId),
    )}/capture`; // capture endpoint :contentReference[oaicite:5]{index=5}

    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "x-user-secret-key": secretKey, // auth header :contentReference[oaicite:6]{index=6}
      },
      timeout: 20000,
    });

    return res.status(200).json({
      message: "Charge captured",
      powerboard: response.data,
    });
  } catch (err) {
    const e = err as AxiosError<any>;
    const status = e.response?.status ?? 500;

    return res.status(status).json({
      message: "Failed to capture charge",
      powerboard_error: e.response?.data ?? e.message,
    });
  }
};

export const getChargeAmount = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    const secretKey = process.env.POWERBOARD_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({ message: "Missing POWERBOARD_SECRET_KEY" });
    }

    const chargeId = req.params.id;
    if (!chargeId) {
      return res.status(400).json({ message: "Missing charge id" });
    }

    const url = `${POWERBOARD_BASE_URL}/v1/charges/${encodeURIComponent(chargeId)}`; // Query charge :contentReference[oaicite:3]{index=3}

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "x-user-secret-key": secretKey,
      },
      timeout: 20000,
    });

    const pb = response.data;

    // Different accounts sometimes shape responses slightly differently,
    // so we defensively read likely fields.
    const amount = pb?.amount ?? pb?.data?.amount ?? pb?.charge?.amount ?? null;

    const currency =
      pb?.currency ?? pb?.data?.currency ?? pb?.charge?.currency ?? null;

    const status = pb?.status ?? pb?.data?.status ?? pb?.charge?.status ?? null;

    const reference =
      pb?.reference ?? pb?.data?.reference ?? pb?.charge?.reference ?? null;

    return res.status(200).json({
      message: "Charge fetched",
      chargeId,
      amount,
      currency,
      status,
      reference,
      powerboard: pb, // keep this while developing; remove later if you want
    });
  } catch (err) {
    const e = err as AxiosError<any>;
    return res.status(e.response?.status ?? 500).json({
      message: "Failed to query charge",
      powerboard_error: e.response?.data ?? e.message,
    });
  }
};
