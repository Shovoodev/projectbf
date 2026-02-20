import express from "express";
import {
  callMeEnquiryEmail,
  getAllEnquires,
  newClientEnquirey,
} from "../controllers/enquireyController";

export default (router: express.Router) => {
  router.get("/get-all-enquires", getAllEnquires);
  router.post("/new-client-enquiry", newClientEnquirey);

  router.post("/call-me", callMeEnquiryEmail);
};
