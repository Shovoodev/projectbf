import express from "express";
import { deceasedPersonData } from "../data/deceasedPersonData";
import { createDeceasedpersondetail } from "../db/deceasedPerson";
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
    console.log({ response });
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
    const entry = await createDeceasedpersondetail({
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
    return res.status(400).json({
      message: "Failed to create deceased person details",
      error: Error instanceof Error ? Error.message : entry,
    });
  } catch (error) {
    console.log(error);
  }
};
