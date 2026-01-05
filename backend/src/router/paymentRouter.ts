import express from "express";
import { getprePaypayment } from "../controllers/paymentController";

export default (router: express.Router) => {
  router.post("/prepay-option", getprePaypayment);
};
