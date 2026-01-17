import express from "express";
import {
  getAttendenceAnswers,
  getdeatilByReference,
  getNoServiceFunral,
} from "../controllers/attendenceController";
import { isAuthenticated } from "../middlewear";

export default (router: express.Router) => {
  router.get("/noservicefunraldata", getNoServiceFunral);
  router.post("/service-details", getdeatilByReference);
  router.post(
    "/newattendingservicecremationanswers",
    isAuthenticated,
    getAttendenceAnswers
  );
};
