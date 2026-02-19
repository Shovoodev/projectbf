import express from "express";
import { confirmPaymentResult, createPaymentIntent } from "../controllers/paymentController";

export default (router: express.Router) => {
  // Backward-compatible create route
  router.post("/create-payment-intent", createPaymentIntent);
  router.post("/payments/confirm", confirmPaymentResult);
};
