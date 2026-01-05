import express from "express";
import {
  getAttendenceAnswers,
  getAttendenceData,
  getNoServiceFunral,
} from "../controllers/attendenceController";
import { isAuthenticated } from "../middlewear";

export default (router: express.Router) => {
  router.get("/newattendingservicecremation", getAttendenceData);
  router.get("/noservicefunraldata", getNoServiceFunral);
  router.post(
    "/newattendingservicecremationanswers",
    isAuthenticated,
    getAttendenceAnswers
  );
};
