import express from "express";
import { registerKinDetals } from "../controllers/kinDetailsController";

export default (router: express.Router) => {
  router.post("/kindetiales", registerKinDetals);
};
