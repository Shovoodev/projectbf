import express from "express";
import { AuthenticatedRequest } from "../lib/types";
import { claudinaryConfig } from "../config/cloudinary";
import { createSignatureDetail, signatureModel } from "../db/signature";

export const getSignatureRegisterAnswer = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const response = req.identity;
    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      deaceasedSalutation,
      deaceasedGivenName,
      deaceasedSurname,
      nextToKeenSalutation,
      nextToKeenGivenName,
      nextToKeenOtherGivenName,
      nextToKeenSurname,
      nextToKeenCurrentAddress,
      nextToKeenMobile,
      nextToKeenEmail,
      nextToKeenRelation,
    } = req.body;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Upload multiple photos
    const photoUrls: string[] = [];
    if (files?.photo) {
      for (const file of files.photo) {
        const photoUpload = await claudinaryConfig().uploader.upload(
          file.path,
          { folder: "signature/photo" }
        );
        photoUrls.push(photoUpload.secure_url);
      }
    }

    // Upload signature photo
    let signUrl = "";
    if (files?.sign?.[0]) {
      const signUpload = await claudinaryConfig().uploader.upload(
        files.sign[0].path,
        {
          folder: "signature/sign",
        }
      );
      signUrl = signUpload.secure_url;
    }

    // Check for existing response
    let existingResponse = await signatureModel.findOne({
      userid: req.identity._id,
    });

    let savedResponse;

    if (existingResponse) {
      // Update existing record
      existingResponse.deaceasedSalutation = deaceasedSalutation;
      existingResponse.deaceasedGivenName = deaceasedGivenName;
      existingResponse.deaceasedSurname = deaceasedSurname;
      existingResponse.nextToKeenSalutation = nextToKeenSalutation;
      existingResponse.nextToKeenGivenName = nextToKeenGivenName;
      existingResponse.nextToKeenOtherGivenName = nextToKeenOtherGivenName;
      existingResponse.nextToKeenSurname = nextToKeenSurname;
      existingResponse.nextToKeenCurrentAddress = nextToKeenCurrentAddress;
      existingResponse.nextToKeenMobile = nextToKeenMobile;
      existingResponse.nextToKeenEmail = nextToKeenEmail;
      existingResponse.nextToKeenRelation = nextToKeenRelation;
      
      // Update arrays (append new photos)
      if (photoUrls.length > 0) {
        existingResponse.nextToKeenPhoto = [
          ...existingResponse.nextToKeenPhoto,
          ...photoUrls
        ];
      }
      
      // Update signature if provided
      if (signUrl) {
        existingResponse.nextToKeenSignPhoto = [signUrl];
      }

      savedResponse = await existingResponse.save();
    } else {
      // Create new record
      savedResponse = await createSignatureDetail({
        userid: req.identity._id,
        deaceasedSalutation,
        deaceasedGivenName,
        deaceasedSurname,
        nextToKeenSalutation,
        nextToKeenGivenName,
        nextToKeenOtherGivenName,
        nextToKeenSurname,
        nextToKeenCurrentAddress,
        nextToKeenMobile,
        nextToKeenEmail,
        nextToKeenRelation,
        nextToKeenPhoto: photoUrls,
        nextToKeenSignPhoto: signUrl ? [signUrl] : [],
      });
    }

    return res.status(201).json({
      message: "Signature details saved successfully",
      data: savedResponse,
    });
  } catch (error) {
    console.error("Error saving signature details:", error);
    return res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};

// Additional controller to get signature details
export const getSignatureDetails = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const response = req.identity;
    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const signatureDetails = await signatureModel.findOne({
      userid: req.identity._id,
    });

    if (!signatureDetails) {
      return res.status(404).json({ message: "No signature details found" });
    }

    return res.status(200).json({
      message: "Signature details retrieved successfully",
      data: signatureDetails,
    });
  } catch (error) {
    console.error("Error getting signature details:", error);
    return res.status(500).json({ 
      message: "Internal server error", 
      error: error.message 
    });
  }
};