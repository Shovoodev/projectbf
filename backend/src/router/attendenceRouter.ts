import express from "express";
import { getAllData, getAnswers } from "../controllers/attendenceController";

export default (router: express.Router) => {
  router.get("/attendence-service-cremention", getAllData);
  router.post("/attendence-service-cremention", getAnswers);
};
