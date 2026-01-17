import express from "express";
import { AuthenticatedRequest } from "../lib/types";
import { FormResponseModel, getAttendenceByReference } from "../db/attendence";
import { noServiceFunralData } from "../data/noServicefunralData";

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

    // Log the entire request body for debugging
    console.log("REQ BODY:", JSON.stringify(req.body, null, 2));

    const { selections, totalPrice = 0 } = req.body;

    if (!selections) {
      return res.status(400).json({ message: "No selections provided" });
    }

    // Extract values and prices from selections
    const stationeryValue = selections?.stationery?.value || "";
    const stationeryPrice = parseFloat(selections?.stationery?.price) || 0;

    const bodyPreparationValue = selections?.bodyPreparation?.value || "";
    const bodyPreparationPrice =
      parseFloat(selections?.bodyPreparation?.price) || 0;

    const coffinValue = selections?.coffin?.value || "";
    const coffinPrice = parseFloat(selections?.coffin?.price) || 0;

    const flowersValue = selections?.flowers?.value || "";
    const flowersPrice = parseFloat(selections?.flowers?.price) || 0;

    const urnValue = selections?.urn?.value || "";
    const urnPrice = parseFloat(selections?.urn?.price) || 0;

    const collectionOfUrnValue = selections?.collectionOfUrn?.value || "";
    const collectionOfUrnPrice =
      parseFloat(selections?.collectionOfUrn?.price) || 0;

    // Calculate total price impact
    const totalPriceImpact =
      stationeryPrice +
      bodyPreparationPrice +
      coffinPrice +
      flowersPrice +
      urnPrice +
      collectionOfUrnPrice;

    console.log("Extracted prices:", {
      stationeryPrice,
      bodyPreparationPrice,
      coffinPrice,
      flowersPrice,
      urnPrice,
      collectionOfUrnPrice,
      totalPriceImpact,
      receivedTotalPrice: totalPrice,
    });

    const BASE_PRICE = 4400; // Match frontend base price
    const finalTotalPrice =
      totalPrice > 0 ? totalPrice : BASE_PRICE + totalPriceImpact;

    let existingResponse = await FormResponseModel.findOne({
      userid: req.identity._id,
      reference: req.identity.reference,
    });

    let savedResponse;

    if (existingResponse) {
      existingResponse.stationery = stationeryValue;
      existingResponse.bodyPreparation = bodyPreparationValue;
      existingResponse.coffin = coffinValue;
      existingResponse.flowers = flowersValue;
      existingResponse.urn = urnValue;
      existingResponse.collectionOfUrn = collectionOfUrnValue;
      existingResponse.totalPriceImpact = totalPriceImpact;
      existingResponse.totalPrice = finalTotalPrice;

      savedResponse = await existingResponse.save();
    } else {
      savedResponse = await FormResponseModel.create({
        userid: req.identity._id,
        reference: req.identity.reference,
        email: req.identity.email,
        stationery: stationeryValue,
        bodyPreparation: bodyPreparationValue,
        coffin: coffinValue,
        flowers: flowersValue,
        urn: urnValue,
        collectionOfUrn: collectionOfUrnValue,
        totalPriceImpact,
        totalPrice: finalTotalPrice,
        status: "draft",
      });
    }

    console.log("Saved response:", {
      stationery: stationeryValue,
      bodyPreparation: bodyPreparationValue,
      coffin: coffinValue,
      flowers: flowersValue,
      urn: urnValue,
      collectionOfUrn: collectionOfUrnValue,
      totalPriceImpact,
      totalPrice: finalTotalPrice,
    });

    return res.status(200).json({
      message: "Attendance response saved",
      data: savedResponse,
      totalPrice: savedResponse.totalPrice,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getdeatilByReference = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    if (!req.body) {
      res.status(400).json({
        success: false,
        error: "Request body is required",
        message: "Please provide reference data in the request body",
      });
      return;
    }
    const { reference } = req.body;

    if (!reference) {
      res.status(400).json({
        success: false,
        error: "Missing required field",
        message: "reference is required in the request body",
        field: "reference",
      });
      return;
    }

    const referenceIdRegex = /^[A-Za-z0-9-]+$/;
    if (!referenceIdRegex.test(reference)) {
      res.status(400).json({
        success: false,
        error: "Invalid format",
        message: "referenceId contains invalid characters",
        validFormat: "Alphanumeric characters and hyphens only",
      });
      return;
    }
    const filtered = await getAttendenceByReference(reference);

    res.json({
      success: true,
      data: filtered,
    });
  } catch (error) {
    console.log(error);
  }
};
