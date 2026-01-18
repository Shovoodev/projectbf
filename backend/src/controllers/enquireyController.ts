import { creatEnquirey, enquireyModel, getEnquirey } from "../db/enquire";
import express from "express";

import { Request, Response } from "express";

export const newClientEnquirey = async (
  req: express.Request,
  res: express.Response,
): Promise<Response> => {
  try {
    const { email, source, message, name, phone } = req.body;

    const savedResponse = await creatEnquirey({
      name,
      email,
      phone,
      message,
      source,
    });

    return res.status(201).json({
      message: "New enquiry created successfully",
      data: savedResponse,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create enquiry",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getAllEnquires = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    const filtered = await getEnquirey();

    res.json(filtered);
  } catch (error) {
    console.log(error);
  }
};
