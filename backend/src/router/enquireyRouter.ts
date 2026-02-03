import express from "express";
import { getAllUsers } from "../controllers/adminController";
import {
  getAllEnquires,
  newClientEnquirey,
} from "../controllers/enquireyController";

export default (router: express.Router) => {
  router.get("/get-all-enquires", getAllEnquires);
  router.post("/new-client-enquiry", newClientEnquirey);
};
