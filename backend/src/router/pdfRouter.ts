import express from "express";
import {
  sendPdfOfInvoice,
  sendPdfOfPrepay,
} from "../controllers/pdf.routeController";
import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
});
export default (router: express.Router) => {
  router.post(
    "/:userid/send-pdf-on-email",
    upload.single("file"),
    sendPdfOfPrepay
  );
  router.post("/api/send-invoice", sendPdfOfInvoice);
};
