// @ts-nocheck
import express from "express";
import {
  getNextToKeenData,
  registerKinDetals,
} from "../controllers/kinDetailsController";
import { isAuthenticated } from "../middlewear";
import { upload } from "../middlewear/upload";
export default (router: express.Router) => {
  router.get("/nexttokeen", getNextToKeenData);
  router.post(
    "/kindetiales",
    upload.fields([
      { name: "photo", maxCount: 1 },
      { name: "sign", maxCount: 1 },
    ]),
    isAuthenticated,
    registerKinDetals
  );
};
