import express from "express";
import attendenceRouter from "./attendenceRouter";
import deceasedPersonRouter from "./deceasedPersonRouter";
import kinDetailsRouter from "./kinDetailsRouter";
import userRouter from "./userRouter";
import adminRouter from "./adminRouter";
import enquireyRouter from "./enquireyRouter";
import paymentRouter from "./paymentRouter";
import pdfRouter from "./pdfRouter";
import blogRouter from "./blogRouter";
import prePayRouter from "./prePayRouter";
import signatureRouter from "./signatureRouter";
import landingAgreementRouter from "./landingAgreementRouter";

const router = express.Router();

export default (): express.Router => {
  attendenceRouter(router);
  deceasedPersonRouter(router);
  kinDetailsRouter(router);
  userRouter(router);
  enquireyRouter(router);
  paymentRouter(router);
  landingAgreementRouter(router)
  pdfRouter(router);
  adminRouter(router);
  blogRouter(router);
  prePayRouter(router);
  signatureRouter(router);
  return router;
};
