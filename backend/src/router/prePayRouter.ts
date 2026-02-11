import express from "express";
import {
  getApplicationdata,
  saveInvestmentApplication,
} from "../controllers/prePayController";
import { isAuthenticated } from "../middlewear";
import { upload, uploadSignature } from "../middlewear/upload";

export default (router: express.Router) => {
  router.post(
    "/save-investment-prepay",
    isAuthenticated,
    uploadSignature,
    saveInvestmentApplication
  );
  router.post(
    "/get-investment-appplication-data",
    isAuthenticated,
    getApplicationdata,
  );
};
