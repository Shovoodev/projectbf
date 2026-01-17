import express from "express";
import { getAllUsers, MarkInvoicePaid } from "../controllers/adminController";

export default (router: express.Router) => {
  router.get("/all-black-tulip-users", getAllUsers);
  router.post("/invoices/mark-paid", MarkInvoicePaid);
};
