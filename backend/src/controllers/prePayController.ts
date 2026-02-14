import express from "express";
import { InvestmentApplicationModel } from "../db/prePayData";
import { AuthenticatedRequest } from "../lib/types";
import { claudinaryConfig } from "../config/cloudinary";
import { getUploadedFile } from "../middlewear/upload";

// ✅ parses only when needed (FormData gives strings, JSON gives objects)
const parseMaybeJson = <T>(value: any, fallback: T): T => {
  if (value == null) return fallback;
  if (typeof value === "object") return value as T; // already parsed JSON body
  if (typeof value !== "string") return fallback;

  try {
    return JSON.parse(value) as T;
  } catch (e) {
    // helpful error to debug which field is bad
    throw new Error(`"${String(value)}" is not valid JSON`);
  }
};

// parseMaybeJson stays same

export const saveInvestmentApplication = async ( 
  req: AuthenticatedRequest,
  res: express.Response) => {
  try {
    if (!req.identity?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const investorOne = parseMaybeJson(req.body.investorOne, {});
    const investorTwo = parseMaybeJson(req.body.investorTwo, {});
    const accountHolders = parseMaybeJson(req.body.accountHolders, {});
    const lumpSum = parseMaybeJson(req.body.lumpSum, { selected: false, amount: 0 });
    const regularSavingsPlan = parseMaybeJson(req.body.regularSavingsPlan, { selected: false, amount: 0 });
    const signatures = parseMaybeJson(req.body.signatures, {});

    // ✅ NEW: declarations + optionalConsents (works for JSON or FormData)
    const declarations = parseMaybeJson(req.body.declarations, []);
    const optionalConsents = parseMaybeJson(req.body.optionalConsents, []);

    const rspEndCondition = req.body.rspEndCondition || "";
    const contributionAmount = Number(req.body.contributionAmount || 0);
    const aspFrequency = req.body.aspFrequency || "";
    const paymentMethod = req.body.paymentMethod || "";

    let signUrl = "";
    const uploadFile = getUploadedFile(req, "prePaySign");

    if (uploadFile?.path) {
      const signUpload = await claudinaryConfig().uploader.upload(uploadFile.path, {
        folder: "kin/sign",
      });
      signUrl = signUpload.secure_url;
    }
    const finalSignatures = signUrl ? { ...signatures, prePaySign: signUrl } : signatures;

    // ✅ MERGE into investorOne
    const investorOneFinal = {
      ...investorOne,
      declarations,
      optionalConsents,
    };

    // ✅ IMPORTANT: use userid everywhere (matches schema + helper)
    const filter = { userid: String(req.identity._id) };

    const update = {
      userid: String(req.identity._id),
      investorOne: investorOneFinal,
      investorTwo,
      accountHolders,
      lumpSum,
      regularSavingsPlan,
      rspEndCondition,
      contributionAmount,
      aspFrequency,
      paymentMethod,
      signatures: finalSignatures,
      status: "draft",
    };

    const savedApplication = await InvestmentApplicationModel.findOneAndUpdate(
      filter,
      update,
      { new: true, upsert: true }
    );

    return res.status(200).json({
      message: "Investment application saved successfully",
      data: savedApplication,
    });
  } catch (error) {
    console.error("SAVE INVESTMENT APPLICATION ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getApplicationdata = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    if (!req.identity?._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingApplication = await InvestmentApplicationModel.findOne({
      userid: String(req.identity._id),
    }).sort({ createdAt: -1 });

    if (!existingApplication) {
      return res.status(404).json({ message: "No application found" });
    }

    return res.status(200).json({
      message: "Investment application retrieved successfully",
      data: existingApplication,
    });
  } catch (error) {
    console.error("GET INVESTMENT APPLICATION ERROR:", error);

    return res.status(500).json({
      message: "Server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
