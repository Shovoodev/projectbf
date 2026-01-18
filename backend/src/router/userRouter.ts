// @ts-nocheck
import {
  login,
  logOut,
  registerUser,
  sendAllRelatedDocuments,
} from "../controllers/userController";
import { getUsers } from "../db/user";

import express from "express";
import { isAuthenticated } from "../middlewear";
import { pdfController } from "../controllers/pdfController";

export default (router: express.Router) => {
  router.get("/user", getUsers);
  router.post("/blacktulipauth/login", login);
  router.post("/blacktulipauth/newuser", registerUser);
  // router.post(
  //   "/sendallrelateddocuments",
  //   isAuthenticated,
  //   sendAllRelatedDocuments
  // );
  router.post("/all-selected-services", isAuthenticated); // to be completed
  router.post("/logout", logOut);
  // router.get("/report/:userId/pdf", isAuthenticated, pdfController);
};
