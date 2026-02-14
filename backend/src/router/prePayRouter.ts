import express from "express";
import {
  getApplicationdata,
  saveInvestmentApplication,
} from "../controllers/prePayController";
import { isAuthenticated } from "../middlewear";
import { upload } from "../middlewear/upload";

export default (router: express.Router) => {
  router.post("/save-investment-prepay", isAuthenticated,   upload.fields([
    { name: "prePayPhoto", maxCount: 1 },
    { name: "prePaySign", maxCount: 1 },
  ]), saveInvestmentApplication);

   
  router.post(
    "/get-investment-appplication-data",
    isAuthenticated,
    getApplicationdata,
  );
};
