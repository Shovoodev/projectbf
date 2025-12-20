import express from "express";
import attendenceRouter from "./attendenceRouter";
import deceasedPersonRouter from "./deceasedPersonRouter";
import kinDetailsRouter from "./kinDetailsRouter";

const router = express.Router();

export default (): express.Router => {
  attendenceRouter(router);
  deceasedPersonRouter(router);
  kinDetailsRouter(router);
  return router;
};
