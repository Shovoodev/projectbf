import express from "express";
import { InvestmentApplicationModel } from "../db/prePayData";
import { AuthenticatedRequest } from "../lib/types";
import { claudinaryConfig } from "../config/cloudinary";

export const saveInvestmentApplication = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Parse FormData JSON fields (because req.body values are strings)
    const investorOne = req.body.investorOne ? JSON.parse(req.body.investorOne) : {};
    const investorTwo = req.body.investorTwo ? JSON.parse(req.body.investorTwo) : {};
    const accountHolders = req.body.accountHolders ? JSON.parse(req.body.accountHolders) : {};
    const lumpSum = req.body.lumpSum ? JSON.parse(req.body.lumpSum) : { selected: false, amount: 0 };
    const regularSavingsPlan = req.body.regularSavingsPlan
      ? JSON.parse(req.body.regularSavingsPlan)
      : { selected: false, amount: 0 };
    const signatures = req.body.signatures ? JSON.parse(req.body.signatures) : {};

    const rspEndCondition = req.body.rspEndCondition || "";
    const contributionAmount = Number(req.body.contributionAmount || 0);
    const aspFrequency = req.body.aspFrequency || "";
    const paymentMethod = req.body.paymentMethod || "";

    // ✅ Get file url from CloudinaryStorage
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    let signUrl = "";
    if (files?.sign?.[0]) {
      // ✅ With CloudinaryStorage, `path` is the Cloudinary URL
      signUrl = files.sign[0].path;
    }

    // ✅ save/update
    let existingApplication = await InvestmentApplicationModel.findOne({
      userid: req.identity._id, // make sure schema field is userid
    });

    let savedApplication;

    const finalSignatures = signUrl ? { ...signatures, sign: signUrl } : signatures;

    if (existingApplication) {
      existingApplication.investorOne = investorOne;
      existingApplication.investorTwo = investorTwo;
      existingApplication.accountHolders = accountHolders;

      existingApplication.lumpSum = lumpSum;
      existingApplication.regularSavingsPlan = regularSavingsPlan;
      existingApplication.rspEndCondition = rspEndCondition;

      existingApplication.contributionAmount = contributionAmount;
      existingApplication.aspFrequency = aspFrequency;
      existingApplication.paymentMethod = paymentMethod;

      existingApplication.signatures = finalSignatures;

      savedApplication = await existingApplication.save();
    } else {
      savedApplication = await InvestmentApplicationModel.create({
        userid: req.identity._id,
        investorOne,
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
      });
    }

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
  // req: express.Request,
  res: express.Response,
) => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    /* ---------------- FIND EXISTING DRAFT ---------------- */
    const existingApplication = await InvestmentApplicationModel.findOne({
      _id: req.identity._id,
    });

    if (!existingApplication) {
      return res.status(404).json({ message: "No application found" });
    }

    /* ---------------- RESPONSE ---------------- */
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
