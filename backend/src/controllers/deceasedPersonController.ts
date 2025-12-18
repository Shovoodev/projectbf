import express from "express";
import { deceasedPersonData } from "../data/deceasedPersonData";

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
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { ...deceasedPersonData } = req.body;

    if (!res) {
      return res.status(400).json({ message: "Answers required" });
    }

    // Example DB save
    // await db.insert(answers)

    res.json({ message: "Answers saved" });
    console.log(res.json());
  } catch (error) {
    console.log(error);
  }
};
