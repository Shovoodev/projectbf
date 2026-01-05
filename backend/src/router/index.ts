import express from "express";
import attendenceRouter from "./attendenceRouter";
import deceasedPersonRouter from "./deceasedPersonRouter";
import kinDetailsRouter from "./kinDetailsRouter";
import userRouter from "./userRouter";
import adminRouter from "./adminRouter";
import enquireyRouter from "./enquireyRouter";
import paymentRouter from "./paymentRouter";

const router = express.Router();

export default (): express.Router => {
  attendenceRouter(router);
  deceasedPersonRouter(router);
  kinDetailsRouter(router);
  userRouter(router);
  adminRouter(router);
  enquireyRouter(router);
  paymentRouter(router);
  return router;
};
