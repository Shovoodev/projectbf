import express from "express";
import { deceasedPersonData } from "../data/deceasedPersonData";
import {
  createDeceasedpersondetail,
  deceasedPersonModel,
} from "../db/deceasedPerson";
import { AuthenticatedRequest } from "../lib/types";
import { claudinaryConfig } from "../config/cloudinary";

export const getDeceasedPersonFormData = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const resquestions = deceasedPersonData;

    res.json(resquestions);
  } catch (error) {
    console.log(error);
  }
};

export const getDeceasedPersonFormAnswers = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const response = req.identity;
    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    let existingResponse = await deceasedPersonModel.findOne({
      userid: req.identity._id,
    });

    let savedResponse;

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
    } = req.body;


    let photoUrls = []
    const files = req.files as Express.Multer.File[];
    for (const file of files) {
      const uploaded = await claudinaryConfig().uploader.upload(file.path, { folder: "kin/photo" });
      photoUrls.push(uploaded.secure_url);
    }
    


    if (existingResponse) {
      existingResponse.salutation = salutation;
      existingResponse.givenName = givenName;
      existingResponse.surname = surname;
      existingResponse.dateofdeath = dateofdeath;
      existingResponse.dateofbirth = dateofbirth;
      existingResponse.deceasedpersonaddress = deceasedpersonaddress;
      existingResponse.deceasedPassedReason = deceasedPassedReason;
      existingResponse.deceasedNow = deceasedNow;
      existingResponse.batterypowereddevices = batterypowereddevices;
      existingResponse.regulardoctoraddress = regulardoctoraddress;

      savedResponse = await existingResponse.save();
    } else {
      savedResponse = await createDeceasedpersondetail({
        userid: req.identity._id,
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
        photo: photoUrls,
      });
    }
    return res.status(201).json({
      message: "Deseased details created successfully",
      data: savedResponse,
    });
  } catch (error) {
    console.log(error);
  }
};
