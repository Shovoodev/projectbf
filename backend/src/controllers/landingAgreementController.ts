import express from "express";
import { claudinaryConfig } from "../config/cloudinary";
import {
    landingAgreementModel,
    createDeceasedpersondetail,
} from "../db/landingAgreement"; // adjust path
import { AuthenticatedRequest } from "../lib/types";
import { FormResponseModel } from "../db/attendence";
import mongoose from "mongoose";

export const fixedPriceLandingAgreement = async (
     req: express.Request,
     res: express.Response
): Promise<any> => {
    try {
          const existingResponse = null; 
    // If you still want to detect duplicates by email/phone later,
    // replace this logic with another unique field

        const {
            salutation,
            givenName,
            surname,
            dateofdeath,
            dateofbirth,
            deceasedpersonaddress,
            deceasedPassedReason,
            deceasedNow,
            batterypowereddevices,
            regulardoctoraddress,

            kin_salutation,
            kin_givenName,
            kin_surname,
            kin_currentAddress,
            kin_mobile,
            kin_email,
            kin_relation,
        } = req.body;

        // ✅ Handle multer fields upload
        // Expecting: upload.fields([{name:'photo'},{name:'kin_photo'},{name:'kin_sign'}])
        const files = (req.files || {}) as {
            [fieldname: string]: Express.Multer.File[];
        };

        // multiple deceased photos
        const deceasedPhotos: string[] = [];
        const photoFiles = files?.photo || [];
        for (const file of photoFiles) {
            const uploaded = await claudinaryConfig().uploader.upload(file.path, {
                folder: "landing-agreement/deceased",
            });
            deceasedPhotos.push(uploaded.secure_url);
        }

        // single kin photo
        let kinPhotoUrl: string | undefined;
        const kinPhotoFile = files?.kin_photo?.[0];
        if (kinPhotoFile) {
            const uploaded = await claudinaryConfig().uploader.upload(kinPhotoFile.path, {
                folder: "landing-agreement/kin",
            });
            kinPhotoUrl = uploaded.secure_url;
        }

        // single kin sign
        let kinSignUrl: string | undefined;
        const kinSignFile = files?.kin_sign?.[0];
        if (kinSignFile) {
            const uploaded = await claudinaryConfig().uploader.upload(kinSignFile.path, {
                folder: "landing-agreement/sign",
            });
            kinSignUrl = uploaded.secure_url;
        }

        

            const savedResponse = await createDeceasedpersondetail({
                userid: new mongoose.Types.ObjectId(), 
                salutation,
                givenName,
                surname,
                dateofdeath,
                dateofbirth,
                deceasedpersonaddress,
                deceasedPassedReason,
                deceasedNow,
                batterypowereddevices,
                regulardoctoraddress,
                photo: deceasedPhotos,

                kin_salutation,
                kin_givenName,
                kin_surname,
                kin_currentAddress,
                kin_mobile,
                kin_email,
                kin_relation,

                kin_photo: kinPhotoUrl,
                kin_sign: kinSignUrl,

                fixedPrice: 6600
            });
       

        return res.status(201).json({
            message: "Landing agreement saved successfully",
            data: savedResponse,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};
export const LandingPageAgreement = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {

    const existingResponse = null; 
    // If you still want to detect duplicates by email/phone later,
    // replace this logic with another unique field

    const {
      salutation,
      givenName,
      surname,
      dateofdeath,
      dateofbirth,
      deceasedpersonaddress,
      deceasedPassedReason,
      deceasedNow,
      batterypowereddevices,
      regulardoctoraddress,

      kin_salutation,
      kin_givenName,
      kin_surname,
      kin_currentAddress,
      kin_mobile,
      kin_email,
      kin_relation,
    } = req.body;

    const files = (req.files || {}) as {
      [fieldname: string]: Express.Multer.File[];
    };

    // ========= Upload deceased photos =========
    const deceasedPhotos: string[] = [];
    const photoFiles = files?.photo || [];

    for (const file of photoFiles) {
      const uploaded = await claudinaryConfig().uploader.upload(file.path, {
        folder: "landing-agreement/deceased",
      });
      deceasedPhotos.push(uploaded.secure_url);
    }

    // ========= Upload kin photo =========
    let kinPhotoUrl: string | undefined;
    const kinPhotoFile = files?.kin_photo?.[0];
    if (kinPhotoFile) {
      const uploaded = await claudinaryConfig().uploader.upload(
        kinPhotoFile.path,
        { folder: "landing-agreement/kin" }
      );
      kinPhotoUrl = uploaded.secure_url;
    }

    // ========= Upload kin sign =========
    let kinSignUrl: string | undefined;
    const kinSignFile = files?.kin_sign?.[0];
    if (kinSignFile) {
      const uploaded = await claudinaryConfig().uploader.upload(
        kinSignFile.path,
        { folder: "landing-agreement/sign" }
      );
      kinSignUrl = uploaded.secure_url;
    }

    // ========= Always Create New Record =========
    const savedResponse = await createDeceasedpersondetail({
      userid: new mongoose.Types.ObjectId(), // dummy id for anonymous
      salutation,
      givenName,
      surname,
      dateofdeath,
      dateofbirth,
      deceasedpersonaddress,
      deceasedPassedReason,
      deceasedNow,
      batterypowereddevices,
      regulardoctoraddress,
      photo: deceasedPhotos,

      kin_salutation,
      kin_givenName,
      kin_surname,
      kin_currentAddress,
      kin_mobile,
      kin_email,
      kin_relation,

      kin_photo: kinPhotoUrl,
      kin_sign: kinSignUrl,
    });

    return res.status(201).json({
      message: "Landing agreement saved successfully",
      data: savedResponse,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const saveFormResponses = async (
    req: AuthenticatedRequest,
    res: express.Response,
) => {
    try {
        if (!req.identity) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { selections } = req.body;

        if (!selections || typeof selections !== "object") {
            return res.status(400).json({ message: "No selections provided" });
        }

        const getValue = (key: string) => selections?.[key]?.value ?? "";
        const getPrice = (key: string) => Number(selections?.[key]?.price ?? 0);

        const stationeryOption = getValue("stationery");
        const stationeryPrice = getPrice("stationery");

        const bodyPreparationOption = getValue("bodyPreparation");
        const bodyPreparationPrice = getPrice("bodyPreparation");

        const coffinOption = getValue("coffin");
        const coffinPrice = getPrice("coffin");

        const flowersOption = getValue("flowers");
        const flowersPrice = getPrice("flowers");

        const urnOption = getValue("urn");
        const urnPrice = getPrice("urn");

        const collectionOfUrnOption = getValue("collectionOfUrn");
        const collectionOfUrnPrice = getPrice("collectionOfUrn");

        const transferOption = getValue("transferOption");
        const transferOptionPrice = getPrice("transferOption");

        const totalPriceImpact =
            stationeryPrice +
            bodyPreparationPrice +
            coffinPrice +
            flowersPrice +
            urnPrice +
            collectionOfUrnPrice +
            transferOptionPrice;

        const BASE_PRICE = 6600;
        const finalTotalPrice = BASE_PRICE + totalPriceImpact;

        if (!Number.isFinite(finalTotalPrice) || finalTotalPrice <= 0) {
            return res.status(400).json({ message: "Invalid total price" });
        }

        let response = await FormResponseModel.findOne({
            userid: String(req.identity._id),
            reference: req.identity.reference, // must exist in identity based on your example
        });

        if (!response) {
            response = new FormResponseModel({
                userid: String(req.identity._id),
                reference: req.identity.reference,
                email: req.identity.email,
                baseTotal: BASE_PRICE,
            });
        }
        response.stationeryOption = stationeryOption;
        response.stationery = stationeryPrice;

        response.bodyPreparationOption = bodyPreparationOption;
        response.bodyPreparation = bodyPreparationPrice;

        response.coffinOption = coffinOption;
        response.coffin = coffinPrice;

        response.flowersOption = flowersOption;
        response.flowers = flowersPrice;

        if (selections?.urn) {
            response.urnOption = urnOption;
            response.urn = urnPrice;
        } else {
            response.urnOption = "";
            response.urn = 0;
        }

        if (selections?.collectionOfUrn) {
            response.collectionOfUrnOption = collectionOfUrnOption;
            response.collectionOfUrn = collectionOfUrnPrice;
        } else {
            response.collectionOfUrnOption = "";
            response.collectionOfUrn = 0;
        }

        response.transferOption = transferOption;
        response.transferOptionPrice = transferOptionPrice;

        response.totalPriceImpact = totalPriceImpact;
        response.totalPrice = finalTotalPrice;

        response.status = "draft";

        const saved = await response.save();

        return res.status(200).json({
            message: "Form response saved",
            data: saved,
        });
    } catch (error) {
        console.error("ERROR:", error);
        if ((error as any)?.code === 11000) {
            return res.status(409).json({
                message: "Duplicate reference. A response with this reference already exists.",
                error,
            });
        }

        return res.status(500).json({
            message: "Server error",
            error: error instanceof Error ? error.message : error,
        });
    }
};