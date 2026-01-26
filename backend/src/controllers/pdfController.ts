import express from "express";
import { AuthenticatedRequest } from "../lib/types";
import { SendInvoice, SendPrePayBond } from "../lib/resend";
import nodemailer from "nodemailer";
import { getAttendenceByUserId } from "../db/attendence";
import { getVandCByUserId } from "../db/viewingAndCremention";
import { getNoCreByUserId } from "../db/noViewingCremention";

export const sendPdfOfPrepay = async (
  req: AuthenticatedRequest,
  // req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const response = req.identity;

    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const pdfBuffer = req.file.buffer;
    const send = SendPrePayBond(pdfBuffer);

    res.status(200).json({ success: true, data: send });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email failed" });
  }
};

export const sendPdfOfInvoice = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const { pdfAttachment } = req.body;
    const response = req.identity;

    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reference = response.reference;
    // Convert base64 to buffer for attachment
    const pdfBuffer = Buffer.from(pdfAttachment, "base64");

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });
    const data = await transporter.sendMail({
      from: '"Administrator" <Blacktulipfunerals@toukir.cc',
      to: "shovoodev@gmail.com",
      subject: `Black tulip funreals with you`,
      text: "we have recived you application and we are happy to give you a wearn welcome in our service ",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #f8f9fa; padding: 20px; text-align: center; }
              .content { padding: 20px; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Tax Invoice</h1>
                <p>Invoice Number: ${reference}</p>
              </div>

              <div class="content">
                <h2>Invoice Details</h2>

                <p>Please find your tax invoice attached as a PDF.</p>
                <p>We kindly ask that payment is made immediately to secure the funeral service date and time.</p>
              </div>

              <div class="footer">
                <p>Best regards,<br>Scott and the Black Tulip team</p>
                <p>OVANTA PTY LTD<br>25 Renown Avenue, Oatley NSW 2223</p>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: `invoice-${reference}.pdf`,
          content: pdfBuffer,
        },
      ],
    });
    console.log({ data });

    res.json({
      success: true,

      message: "Invoice sent successfully",
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to send invoice" });
  }
};

export const sendAttendenceServiceSelection = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    const response = req.identity;

    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = response._id;
    const doc =
      (await getAttendenceByUserId(userId)) ||
      (await getVandCByUserId(userId)) ||
      (await getNoCreByUserId(userId));

    const data = {
      baseTotal: doc.baseTotal,
      service: doc.service,
      reference: doc.reference,
      email: doc.email,
      urn: doc.urn,
      collectionOfUrn: doc.collectionOfUrn,
      totalPriceImpact: doc.totalPriceImpact,
      totalPrice: doc.totalPrice,
    };

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
