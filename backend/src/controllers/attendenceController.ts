import express from "express";
import { attendenceData } from "../data/attandenceData";
import { AuthenticatedRequest } from "../lib/types";
import { FormResponseModel } from "../db/attendence";
import { noServiceFunralData } from "../data/noServicefunralData";

export const getAttendenceData = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const filtered = attendenceData;

    res.json(filtered);
  } catch (error) {
    console.log(error);
  }
};

export const getNoServiceFunral = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const filtered = noServiceFunralData;

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

    const {
      stationery,
      bodypreparation,
      coffin,
      flowers,
      urn,
      collectionOfUrn,
      totalPriceImpact = 0,
    } = req.body;

    let existingResponse = await FormResponseModel.findOne({
      userid: req.identity._id,
      reference: req.identity.reference,
    });

    let savedResponse;

    if (existingResponse) {
      existingResponse.stationery = stationery;
      existingResponse.bodyPreparation = bodypreparation;
      existingResponse.coffin = coffin;
      existingResponse.flowers = flowers;
      existingResponse.urn = urn;
      existingResponse.collectionOfUrn = collectionOfUrn;
      existingResponse.totalPriceImpact = totalPriceImpact;

      savedResponse = await existingResponse.save();
    } else {
      savedResponse = await FormResponseModel.create({
        userid: req.identity._id,
        reference: req.identity.reference,
        email: req.identity.email,
        stationery,
        bodypreparation,
        coffin,
        flowers,
        urn,
        collectionOfUrn,
        totalPriceImpact,
        status: "draft",
      });
    }

    const allResponses = await FormResponseModel.find({
      userid: req.identity._id,
    });

    const totalPrice = allResponses.reduce(
      (sum, r) => sum + (r.totalPriceImpact || 0),
      0
    );

    await FormResponseModel.updateMany(
      { userid: req.identity._id },
      { totalPrice }
    );

    return res.status(200).json({
      message: "Attendance response saved",
      data: savedResponse,
      totalPrice,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
