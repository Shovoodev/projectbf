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
): Promise<any> => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.identity._id;
    const { questionText, textAnswer } = req.body;

    if (!questionText) {
      return res.status(400).json({ message: "questionText is required" });
    }

    const price = 24;

    const attendence = await getAttendenceByUserId(user);

    if (!attendence) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    const { email, reference } = attendence;

    const { responses } = req.body;
    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ message: "Responses array is required" });
    }

    for (let i = 0; i < responses.length; i++) {
      if (!responses[i].questionText) {
        return res.status(400).json({
          message: `Response at index ${i} is missing questionText`,
        });
      }
    }

    const entry = await createResponseAttandence({
      userid: user,
      email,
      reference,
      responses: responses.map((r: any) => ({
        questionId: r.questionId,
        questionText: r.questionText,
        textAnswer: r.textAnswer,
        totalPriceImpact: price,
      })),
    });

    return res.status(201).json({
      message: "Attendance response created successfully",
      data: entry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create attendance response",
      error: error instanceof Error ? error.message : error,
    });
  }
};
