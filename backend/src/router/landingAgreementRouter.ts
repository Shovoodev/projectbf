
import express from "express";
import { upload } from "../middlewear/upload";
import { isAuthenticated } from "../middlewear";
import { fixedPriceLandingAgreement, LandingPageAgreement } from "../controllers/landingAgreementController";


export default (router: express.Router) => {
    router.post(
        "/landing-agreement-with-fixed-price",
        upload.fields([
            { name: "photo", maxCount: 2 },
            { name: "kin_photo", maxCount: 1 },
            { name: "kin_sign", maxCount: 1 },
        ]),
        isAuthenticated,
        fixedPriceLandingAgreement
    );
    router.post(
        "/landing-agreement",
        upload.fields([
            { name: "photo", maxCount: 2 },
            { name: "kin_photo", maxCount: 1 },
            { name: "kin_sign", maxCount: 1 },
        ]),
        LandingPageAgreement
    );
}