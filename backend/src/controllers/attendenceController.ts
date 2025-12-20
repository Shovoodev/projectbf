import express from "express";
import { attendenceData } from "../data/attandenceData";
import { createattendencedetail } from "../db/attendence";
import { AuthenticatedRequest } from "../lib/types";

export const getAttendenceData = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const page = Number(req.query.page);
    const filtered = page
      ? attendenceData.filter((q) => q.type === "radio")
      : attendenceData;

    res.json(filtered);
  } catch (error) {
    console.log(error);
  }
};

export const getAnswers = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const user = req.identity;
    const { questionText, value, priceImpact } = req.body;
    const entry = await createattendencedetail({
      userid: user._id,
      questionText,
      value,
      priceImpact,
    });
    return res.status(400).json({
      message: "Failed to create attendence person details",
      error: Error instanceof Error ? Error.message : entry,
    });
  } catch (error) {
    console.log(error);
  }
};
