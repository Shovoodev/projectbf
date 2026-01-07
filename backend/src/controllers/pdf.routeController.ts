import express from "express";
import { AuthenticatedRequest } from "../lib/types";
import SendEmail from "../lib/resend";

export const sendPdfOfPrepay = async (
  req: AuthenticatedRequest,
  // req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const response = req.identity;

    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const pdfBuffer = req.file.buffer;
    const send = SendEmail(response.email, pdfBuffer);

    res.status(200).json({ success: true, data: send });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email failed" });
  }
};
