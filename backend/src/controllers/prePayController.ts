import express from "express";
import { AuthenticatedRequest } from "../lib/types";
import { InvestmentApplicationModel } from "../db/prePayData";

export const saveInvestmentApplication = async (
  //   req: AuthenticatedRequest,
  req: express.Request,
  res: express.Response
) => {
  try {
    // /* ---------------- AUTH CHECK ---------------- */
    // if (!req.identity) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    /* ---------------- REQUEST BODY ---------------- */
    const {
      investorOne,
      investorTwo,
      accountHolders,
      lumpSum,
      regularSavingsPlan,
      rspEndCondition,
      contributionAmount,
      aspFrequency,
      paymentMethod,
      signatures,
    } = req.body;

    /* ---------------- BASIC VALIDATION ---------------- */
    if (!investorOne) {
      return res
        .status(400)
        .json({ message: "Investor One details are required" });
    }

    /* ---------------- FIND EXISTING DRAFT ---------------- */
    let existingApplication = await InvestmentApplicationModel.findOne({
      //   userId: req.identity._id,
    });

    let savedApplication;

    /* ---------------- UPDATE ---------------- */
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

      existingApplication.signatures = signatures;

      savedApplication = await existingApplication.save();
    } else {
      /* ---------------- CREATE ---------------- */
      savedApplication = await InvestmentApplicationModel.create({
        // userId: req.identity._id,
        // email: req.identity.email,

        investorOne,
        investorTwo,

        accountHolders,

        lumpSum,
        regularSavingsPlan,
        rspEndCondition,

        contributionAmount,
        aspFrequency,
        paymentMethod,

        signatures,

        status: "draft",
      });
    }

    /* ---------------- RESPONSE ---------------- */
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
