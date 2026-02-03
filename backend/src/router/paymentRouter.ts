import express from "express";
import {
  getprePaypayment,
  paymentReciverMarkPaid,
} from "../controllers/paymentController";

export default (router: express.Router) => {
  router.post("/prepay-option", getprePaypayment);
  router.post("/create-payment-intent", paymentReciverMarkPaid);
};
