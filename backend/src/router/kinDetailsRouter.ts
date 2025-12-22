// @ts-nocheck
import express from "express";
import { registerKinDetals } from "../controllers/kinDetailsController";
import { isAuthenticated } from "../middlewear";
export default (router: express.Router) => {
  router.post("/kindetiales", isAuthenticated, registerKinDetals);
};
