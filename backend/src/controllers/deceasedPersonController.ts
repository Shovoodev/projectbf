import express from "express";
import { deceasedPersonData } from "../data/deceasedPersonData";
import {
  createDeceasedpersondetail,
  deceasedPersonModel,
} from "../db/deceasedPerson";
import { AuthenticatedRequest } from "../lib/types";

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
      dateOfDeath,
      address,
      deceasedPassedReason,
      deceasedNow,
      batterypowereddevices,
      regulardoctoraddress,
    } = req.body;

    if (existingResponse) {
      existingResponse.salutation = salutation;
      existingResponse.givenName = givenName;
      existingResponse.surname = surname;
      existingResponse.dateOfDeath = dateOfDeath;
      existingResponse.address = address;
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
        dateOfDeath,
        address,
        deceasedPassedReason,
        deceasedNow,
        batterypowereddevices,
        regulardoctoraddress,
      });
    }
    return res.status(200).json({
      message: "Attendance response saved",
      data: savedResponse,
    });
  } catch (error) {
    console.log(error);
  }
};
