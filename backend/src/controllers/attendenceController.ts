import express from "express";
import { attendenceData } from "../data/attandenceData";

export const getAllData = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const page = Number(req.query.page);
    const filtered = page
      ? attendenceData.filter((q) => q.page === page)
      : attendenceData;

    res.json(filtered);
  } catch (error) {
    console.log(error);
  }
};

export const getAnswers = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { answers } = req.body;

    if (!answers) {
      return res.status(400).json({ message: "Answers required" });
    }

    // Example DB save
    // await db.insert(answers)

    res.json({ message: "Answers saved" });
  } catch (error) {
    console.log(error);
  }
};
