import express from "express";
import {
  getDeceasedPersonFormAnswers,
  getDeceasedPersonFormData,
} from "../controllers/deceasedPersonController";

export default (router: express.Router) => {
  router.get("/desencepersondetails", getDeceasedPersonFormData);
  router.post(
    "/attendenceservicecrementionanswers",
    getDeceasedPersonFormAnswers
  );
};
