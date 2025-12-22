import express from "express";
import { createKinDetail } from "../db/kinDetails";
import { AuthenticatedRequest } from "../lib/types";

export const registerKinDetals = async (
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
      currentAddress,
      mobile,
      relation,
      photo,
      sign,
    } = req.body;

    const entry = await createKinDetail({
      userid: req.identity._id,
      salutation,
      givenName,
      surname,
      currentAddress,
      mobile,
      relation,
      photo,
      sign,
    });

    return res.status(201).json({
      message: "Kin details created successfully",
      data: entry,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create kin details",
      error: error instanceof Error ? error.message : error,
    });
  }
};
