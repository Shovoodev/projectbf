import express from "express";
import {  adminlogin, MarkInvoicePaid, registerAdmin } from "../controllers/adminController";

export default (router: express.Router) => {
  router.post("/add-btf-admin", registerAdmin);
  router.post("/adminstration-btf/login", adminlogin);
  router.post("/invoices/mark-paid", MarkInvoicePaid);
};
