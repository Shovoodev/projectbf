import {
  registerUser,
  sendAllRelatedDocuments,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewear";

import express from "express";

export default (router: express.Router) => {
  router.post("/registeruser", registerUser);
  router.post("/sendallrelateddocuments", sendAllRelatedDocuments);
};
