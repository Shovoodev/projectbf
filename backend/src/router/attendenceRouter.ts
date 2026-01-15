import express from "express";
import {
  getAttendenceAnswers,
  getNoServiceFunral,
} from "../controllers/attendenceController";
import { isAuthenticated } from "../middlewear";

export default (router: express.Router) => {
  router.get("/noservicefunraldata", getNoServiceFunral);
  router.post(
    "/newattendingservicecremationanswers",
    isAuthenticated,
    getAttendenceAnswers
  );
};
