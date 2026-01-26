import express from "express";
import {
  getDeceasedPersonFormAnswers,
  getDeceasedPersonFormData,
} from "../controllers/deceasedPersonController";
import { isAuthenticated } from "../middlewear";
import { upload } from "../middlewear/upload";

export default (router: express.Router) => {
  router.get("/desencepersondetails", getDeceasedPersonFormData);
  router.post(
    "/desencepersondetailsanswer", upload.array("photo", 2),
    isAuthenticated,
    getDeceasedPersonFormAnswers
  );
};
