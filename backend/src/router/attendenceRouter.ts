import express from "express";
import {
  getAttendenceAnswers,
  getAttendenceData,
} from "../controllers/attendenceController";
import { isAuthenticated } from "../middlewear";

export default (router: express.Router) => {
  router.get("/attendenceservicecremention", getAttendenceData);
  router.post(
    "/attendenceservicecrementionanswers",
    isAuthenticated,
    getAttendenceAnswers
  );
};
