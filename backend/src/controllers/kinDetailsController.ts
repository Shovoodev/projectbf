import express from "express";
import { createKinDetail } from "../db/kinDetails";

export const registerKinDetals = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const {
      userid,
      salutation,
      givenName,
      surname,
      currentAddress,
      mobile,
      relation,
      photo,
      sign,
    } = req.body;
    const member = await createKinDetail({
      userid,
      salutation,
      givenName,
      surname,
      currentAddress,
      mobile,
      relation,
      photo,
      sign,
    });
    console.log({ member });
    return res.status(400).json({
      message: "Failed to create kin details",
      error: Error instanceof Error ? Error.message : "error",
    });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
