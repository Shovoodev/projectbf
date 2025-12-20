import express from "express";
import { createKinDetail } from "../db/kinDetails";
import { AuthenticatedRequest } from "../lib/types";

export const registerKinDetals = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  const user = req.identity;
  try {
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
      userid: user._id,
      salutation,
      givenName,
      surname,
      currentAddress,
      mobile,
      relation,
      photo,
      sign,
    });
    return res.status(400).json({
      message: "Failed to create kin details",
      error: Error instanceof Error ? Error.message : entry,
    });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
