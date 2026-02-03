import express from "express";
import {
  getAllServiceData,
  getAttendenceAnswers,
  getdeatilByReference,
  getNoServiceCrementionnswers,
  getNoServiceFunral,
  getVandCnswers,
} from "../controllers/attendenceController";
import { isAuthenticated } from "../middlewear";

export default (router: express.Router) => {
  router.get("/noservicefunraldata", getNoServiceFunral);
  router.get("/all-service-data", isAuthenticated, getAllServiceData);
  router.post("/service-details", getdeatilByReference);
  router.post(
    "/newattendingservicecremationanswers",
    isAuthenticated,
    getAttendenceAnswers,
  );
  router.post(
    "/new-view-and-service-cremation",
    isAuthenticated,
    getVandCnswers,
  );
  router.post(
    "/new-no-service-cremation",
    isAuthenticated,
    getNoServiceCrementionnswers,
  );
};
