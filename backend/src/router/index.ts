import express from "express";
import attendenceRouter from "./attendenceRouter";
import deceasedPersonRouter from "./deceasedPersonRouter";

const router = express.Router();

export default (): express.Router => {
  attendenceRouter(router);
  deceasedPersonRouter(router);
  return router;
};
