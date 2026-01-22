import express from "express";
import { saveInvestmentApplication } from "../controllers/prePayController";
import { isAuthenticated } from "../middlewear";

export default (router: express.Router) => {
  router.post(
    "/save-investment-prepay",
    // isAuthenticated,
    saveInvestmentApplication
  );
};
