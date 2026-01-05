import express from "express";
import { getAllUsers } from "../controllers/adminController";

export default (router: express.Router) => {
  router.get("/all-black-tulip-users", getAllUsers);
};
