import express from "express";
import {
  getDeceasedPersonFormAnswers,
  getDeceasedPersonFormData,
} from "../controllers/deceasedPersonController";
import { isAuthenticated } from "../middlewear";

export default (router: express.Router) => {
  router.get("/desencepersondetails", getDeceasedPersonFormData);
  router.post(
    "/desencepersondetailsanswer",
    isAuthenticated,
    getDeceasedPersonFormAnswers
  );
};
