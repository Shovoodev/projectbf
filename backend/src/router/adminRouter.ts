import express from "express";
import {  adminlogin, MarkInvoicePaid, registerAdmin } from "../controllers/adminController";
import { isAuthenticatedAdmin } from "../middlewear";

export default (router: express.Router) => {
  router.post("/add-btf-admin", isAuthenticatedAdmin, registerAdmin);
  router.post("/adminstration-btf/login", adminlogin);
  router.post("/invoices/mark-paid", MarkInvoicePaid);
};
