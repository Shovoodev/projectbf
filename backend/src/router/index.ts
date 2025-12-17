import express from "express";
import attendenceRouter from "./attendenceRouter";

const router = express.Router();

export default (): express.Router => {
  attendenceRouter(router);
  return router;
};
