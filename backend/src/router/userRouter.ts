// @ts-nocheck
import {
  login,
  logOut,
  registerUser,
  sendAllRelatedDocuments,
} from "../controllers/userController";
import { getUsers } from "../db/user";

import express from "express";

export default (router: express.Router) => {
  router.get("/user", getUsers);
  router.post("/blacktulipauth/login", login);
  router.post("/registeruser", registerUser);
  router.post("/sendallrelateddocuments", sendAllRelatedDocuments);
  router.post("/logout", logOut);
};
