import express from "express";
import {
  // generatePdf,
  sendAttendenceServiceSelection,
  sendPdfOfInvoice,
  sendPdfOfPrepay,
  // generatePdf,
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

  router.get(
    "/all-selected-selections",
    isAuthenticated,
    sendAttendenceServiceSelection,
  );
};
