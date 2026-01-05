import express from "express";
import { createKinDetail, KinDetailsModel } from "../db/kinDetails";
import { AuthenticatedRequest } from "../lib/types";
import { NextToKeen } from "../data/nextToKeenData";
import { claudinaryConfig } from "../config/cloudinary";

export const getNextToKeenData = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const filtered = NextToKeen;

    res.json(filtered);
  } catch (error) {
    console.log(error);
  }
};

export const registerKinDetals = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const response = req.identity;
    const { userid } = req.params;
    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("FILES:", req.files);

    let savedResponse;
    const {
      salutation,
      givenName,
      surname,
      currentAddress,
      mobile,
      email,
      relation,
    } = req.body;

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    let photoUrl = "";
    let signUrl = "";
    if (files?.photo?.[0]) {
      const photoUpload = await claudinaryConfig().uploader.upload(
        files.photo[0].path,
        { folder: "kin/photo" }
      );
      photoUrl = photoUpload.secure_url;
    }

    if (files?.sign?.[0]) {
      const signUpload = await claudinaryConfig().uploader.upload(
        files.sign[0].path,
        {
          folder: "kin/sign",
        }
      );
      signUrl = signUpload.secure_url;
    }
    let existingResponse = await KinDetailsModel.findOne({
      userid: req.identity._id,
    });

    if (existingResponse) {
      existingResponse.salutation = salutation;
      existingResponse.givenName = givenName;
      existingResponse.surname = surname;
      existingResponse.currentAddress = currentAddress;
      existingResponse.mobile = mobile;
      existingResponse.email = email;
      existingResponse.relation = relation;
      existingResponse.photo = photoUrl;
      existingResponse.sign = signUrl;

      savedResponse = await existingResponse.save();
    } else {
      savedResponse = await createKinDetail({
        userid: req.identity._id,
        salutation,
        givenName,
        surname,
        currentAddress,
        mobile,
        email,
        relation,
        photo: photoUrl,
        sign: signUrl,
      });
    }
    console.log({ savedResponse });
    return res.status(201).json({
      message: "Kin details created successfully",
      data: savedResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create kin details",
      error: error instanceof Error ? error.message : error,
    });
  }
};
