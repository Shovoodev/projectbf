import express from "express";

import { isAuthenticated } from "../middlewear";
import { upload } from "../middlewear/upload";
import { getSignatureRegisterAnswer } from "../controllers/signatureController";

export default (router: express.Router) => {
  router.post(
    "/signature-register", upload.array("photo", 2),
    isAuthenticated,
    getSignatureRegisterAnswer
  );
};
