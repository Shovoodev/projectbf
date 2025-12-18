import express from "express";
import {
  getAnswers,
  getAttendenceData,
} from "../controllers/attendenceController";

export default (router: express.Router) => {
  router.get("/attendenceservicecremention", getAttendenceData);
  router.post("/attendenceservicecrementionanswers", getAnswers);
};
