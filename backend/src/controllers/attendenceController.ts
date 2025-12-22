import express from "express";
import { attendenceData } from "../data/attandenceData";
import { AuthenticatedRequest } from "../lib/types";
import { createResponseAttandence } from "../db/attendence";
import { getAttendenceByUserId } from "../db/user";

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
export const getAttendenceAnswers = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("RAW BODY:", req.body);

    const { responses } = req.body;

    if (!responses || !Array.isArray(responses)) {
      return res.status(400).json({ message: "responses array missing" });
    }

    console.log("RESPONSES:", responses);
    console.log("QUESTION TEXT:", responses[0]?.questionText);

    if (!responses[0]?.questionText) {
      return res.status(400).json({
        message: "questionText is required inside responses",
      });
    }

    const attendence = await getAttendenceByUserId(req.identity._id);

    if (!attendence) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    const entry = await createResponseAttandence({
      userid: req.identity._id,
      email: attendence.email,
      reference: attendence.reference,
      responses,
    });

    return res.status(201).json({
      message: "Attendance response saved",
      data: entry,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
