import express from "express";

import { isAuthenticated } from "../middlewear";
import { upload } from "../middlewear/upload";
import { getSignatureRegisterAnswer } from "../controllers/signatureController";

export default (router: express.Router) => {
  router.post(
    "/signature-register",
    isAuthenticated,
    upload.fields([
      { name: "photo", maxCount: 2 },
      { name: "sign", maxCount: 1 },
    ]),
    getSignatureRegisterAnswer
  );
  
};
