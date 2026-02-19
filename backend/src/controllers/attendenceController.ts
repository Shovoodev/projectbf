import express from "express";
import { AuthenticatedRequest } from "../lib/types";
import {
  FormResponseModel,
  getAttendenceByReference,
  getAttendenceByUserId,
} from "../db/attendence";
import { FormNoServiceResponseModel } from "../db/noViewingCremention";
import { FormVandCResponseModel } from "../db/viewingAndCremention";

export const getAttendenceAnswers = async (
  req: AuthenticatedRequest,
  res: express.Response,
) => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { selections } = req.body;

    if (!selections) {
      return res.status(400).json({ message: "No selections provided" });
    }

    const getValue = (key: string) => selections?.[key]?.value ?? "";
    const getPrice = (key: string) => Number(selections?.[key]?.price ?? 0);

    const stationeryOption = getValue("stationery");
    const stationeryPrice = getPrice("stationery");

    const bodyPreparationOption = getValue("bodyPreparation");
    const bodyPreparationPrice = getPrice("bodyPreparation");

    const coffinOption = getValue("coffin");
    const coffinPrice = getPrice("coffin");

    const flowersOption = getValue("flowers");
    const flowersPrice = getPrice("flowers");

    const urnOption = getValue("urn");
    const urnPrice = getPrice("urn");

    const collectionOfUrnOption = getValue("collectionOfUrn");
    const collectionOfUrnPrice = getPrice("collectionOfUrn");

    const transferOption = getValue("transferOption");
    const transferOptionPrice = getPrice("transferOption");

    const totalPriceImpact =
      stationeryPrice +
      bodyPreparationPrice +
      coffinPrice +
      flowersPrice +
      urnPrice +
      collectionOfUrnPrice +
      transferOptionPrice

    const BASE_PRICE = 4895;
    const finalTotalPrice = BASE_PRICE + totalPriceImpact;

    if (finalTotalPrice <= 0) {
      return res.status(400).json({ message: "Invalid total price" });
    }
    let response = await FormResponseModel.findOne({
      userid: req.identity._id,
      reference: req.identity.reference,
    });

    if (!response) {
      response = new FormResponseModel({
        userid: req.identity._id,
        reference: req.identity.reference,
        email: req.identity.email,
      });
    }

    response.stationeryOption = stationeryOption;
    response.stationery = stationeryPrice;

    response.bodyPreparationOption = bodyPreparationOption;
    response.bodyPreparation = bodyPreparationPrice;

    response.coffinOption = coffinOption;
    response.coffin = coffinPrice;

    response.flowersOption = flowersOption;
    response.flowers = flowersPrice;

    if (selections?.urn) {
      response.urnOption = urnOption;
      response.urn = urnPrice;
    }

    if (selections?.collectionOfUrn) {
      response.collectionOfUrnOption = collectionOfUrnOption;
      response.collectionOfUrn = collectionOfUrnPrice;
    }


    response.collectionOfUrnOption = collectionOfUrnOption;
    response.collectionOfUrn = collectionOfUrnPrice;

    response.transferOption = transferOption;
    response.transferOptionPrice = transferOptionPrice

    response.totalPriceImpact = totalPriceImpact;
    response.totalPrice = finalTotalPrice;
    response.status = "draft";

    const saved = await response.save();

    return res.status(200).json({
      message: "Attendance response saved",
      data: saved,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getVandCnswers = async (
  req: AuthenticatedRequest,
  res: express.Response,
) => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { selections, totalPrice = 0 } = req.body;

    if (!selections) {
      return res.status(400).json({ message: "No selections provided" });
    }

    const getValue = (key: string) => selections?.[key]?.value ?? "";
    const getPrice = (key: string) => Number(selections?.[key]?.price ?? 0);

    const urnValue = getValue("urn");
    const urnPrice = getPrice("urn");

    const collectionOfUrnValue = getValue("collectionOfUrn");
    const collectionOfUrnPrice = getPrice("collectionOfUrn");

    const transferOptionValue = getValue("transferOption");
    const transferOptionPrice = getPrice("transferOption");

    const totalPriceImpact =
      urnPrice +
      collectionOfUrnPrice +
      transferOptionPrice

    const BASE_PRICE = 3595;
    const finalTotalPrice = totalPrice > 0 ? Number(totalPrice) : BASE_PRICE + totalPriceImpact;

    let existingResponse = await FormVandCResponseModel.findOne({
      userid: req.identity._id,
      reference: req.identity.reference,
    });

    let savedResponse;

    if (existingResponse) {
      existingResponse.urn = urnValue;
      existingResponse.collectionOfUrn = collectionOfUrnValue;

      existingResponse.transferOption = transferOptionValue;
      existingResponse.transferOptionPrice = transferOptionPrice;

      existingResponse.totalPriceImpact = totalPriceImpact;
      existingResponse.totalPrice = finalTotalPrice;
      existingResponse.status = "draft";

      savedResponse = await existingResponse.save();
    } else {
      savedResponse = await FormVandCResponseModel.create({
        userid: req.identity._id,
        reference: req.identity.reference,
        email: req.identity.email,

        urn: urnValue,
        collectionOfUrn: collectionOfUrnValue,

        transferOption: transferOptionValue,
        transferOptionPrice,

        totalPriceImpact,
        totalPrice: finalTotalPrice,
        status: "draft",
      });
    }

    return res.status(200).json({
      message: "Viewing And Cremention response saved",
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

export const getNoServiceCrementionnswers = async (
  req: AuthenticatedRequest,
  res: express.Response,
) => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { selections, totalPrice = 0 } = req.body;

    if (!selections) {
      return res.status(400).json({ message: "No selections provided" });
    }

    const BASE_PRICE = 2295;

    const normalizeSelection = (field: any, fallback: string) => {
      if (!field) return fallback;
      if (typeof field === "string" && field.trim() !== "") return field;
      if (
        typeof field === "object" &&
        typeof field.value === "string" &&
        field.value.trim() !== ""
      ) {
        return field.value;
      }
      return fallback;
    };

    // ✅ Read prices correctly
    const urnPrice = Number(selections?.urn?.price ?? 0);
    const collectionOfUrnPrice = Number(selections?.collectionOfUrn?.price ?? 0);
    const transferOptionPrice = Number(selections?.transferOption?.price ?? 0);

    // ✅ Values
    const urnValue = normalizeSelection(selections?.urn, "Funera Preferred Adult Urn");
    const collectionOfUrnValue = normalizeSelection(
      selections?.collectionOfUrn,
      "Collect in Person",
    );
    const transferOptionValue = normalizeSelection(
      selections?.transferOption,
      "Sydney Metro",
    );

    // ✅ Include transferZonePlacePrice in impact
    const totalPriceImpact =
      urnPrice + collectionOfUrnPrice + transferOptionPrice

    const finalTotalPrice =
      totalPrice > 0 ? Number(totalPrice) : BASE_PRICE + totalPriceImpact;

    let existingResponse = await FormNoServiceResponseModel.findOne({
      userid: req.identity._id,
      reference: req.identity.reference,
    });

    let savedResponse;

    if (existingResponse) {
      existingResponse.urn = urnValue;
      existingResponse.collectionOfUrn = collectionOfUrnValue;
      existingResponse.transferOption = transferOptionValue;

      // ✅ Save prices too (needs schema field transferOptionPrice)
      existingResponse.transferOptionPrice = transferOptionPrice;

      existingResponse.totalPriceImpact = totalPriceImpact;
      existingResponse.totalPrice = finalTotalPrice;
      existingResponse.status = "draft";

      savedResponse = await existingResponse.save();
    } else {
      savedResponse = await FormNoServiceResponseModel.create({
        userid: req.identity._id,
        reference: req.identity.reference,
        email: req.identity.email,

        urn: urnValue,
        collectionOfUrn: collectionOfUrnValue,
        transferOption: transferOptionValue,
        transferOptionPrice, // ✅ save
        totalPriceImpact,
        totalPrice: finalTotalPrice,
        status: "draft",
      });
    }

    return res.status(200).json({
      message: "No Service Cremation response saved",
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
  res: express.Response,
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
export const getAllServiceData = async (
  req: AuthenticatedRequest,
  res: express.Response,
) => {
  if (!req.identity) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const userId = req.identity._id;
  const data = await getAttendenceByUserId(userId);

  res.json({ data });
};
