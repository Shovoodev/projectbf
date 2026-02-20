import express from "express";
import {
  notifyAdminNewAgreement,
  notifyClientAccountCreated,
  sendAttendenceServiceSelection,
  sendPdfOfInvoice,
  sendPdfOfPrepay,
} from "../controllers/pdfController";
import multer from "multer";
import { isAuthenticated } from "../middlewear";

const upload = multer({
  storage: multer.memoryStorage(),
});

export default (router: express.Router) => {
  router.post("/send-pdf-on-email", upload.single("file"), sendPdfOfPrepay);
  // router.post("/generate-pdf", generatePdf);

  router.post("/api/send-invoice", isAuthenticated, sendPdfOfInvoice);
  router.post(
    "/notify-admin-agreement",
    isAuthenticated,
    notifyAdminNewAgreement
  );
  router.get(
    "/all-selected-selections",
    isAuthenticated,
    sendAttendenceServiceSelection,
  );
  router.post("/notify-client-account", notifyClientAccountCreated);
};
