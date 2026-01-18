import express from "express";
import {
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
  router.post(
    "/:userid/send-pdf-on-email",
    upload.single("file"),
    isAuthenticated,
    sendPdfOfPrepay,
  );
  router.post("/api/send-invoice", isAuthenticated, sendPdfOfInvoice);
  router.get(
    "/all-selected-selections",
    isAuthenticated,
    sendAttendenceServiceSelection,
  );
  // router.get(
  //   "/all-vandc-selected-selections",
  //   isAuthenticated,
  //   sendAttendenceServiceSelection,
  // );
  // router.get(
  //   "/all-nocre-selected-selections",
  //   isAuthenticated,
  //   sendANocreServiceSelection,
  // );
};
