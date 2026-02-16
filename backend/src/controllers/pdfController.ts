import express from "express";
import nodemailer from "nodemailer";
import { getAttendenceByUserId } from "../db/attendence";
import { getNoCreByUserId } from "../db/noViewingCremention";
import { getVandCByUserId } from "../db/viewingAndCremention";
import { SendPrePayBond } from "../lib/resend";
import { AuthenticatedRequest } from "../lib/types";
// import { generatePdfDocument } from "./prepayPdfs/PDFDocument";

// export const generatePdf = async (
//   req: express.Request,
//   res: express.Response,
// ) => {
//   try {
//     const pdfBuffer = await renderKeyInvestPdf(req.body || {});

//     res.status(200);
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       'attachment; filename="KeyInvest-Application-Form.pdf"',
//     );
//     res.setHeader("Content-Length", String(pdfBuffer.length));
//     res.setHeader("Cache-Control", "no-store");

//     res.end(pdfBuffer);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to generate PDF" });
//   }
// };
// Send PDF via Email

export const sendPdfOfInvoice = async (
  req: AuthenticatedRequest,
  res: express.Response,
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
      to: "mdathikhasan136@gmail.com , shovoodev@gmail.com",
      subject: `Thanks  hi beleaving us for trusting us `,
      text: "we get all you documents",
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

export const sendPdfOfPrepay = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file received. Make sure FormData field name is 'file'.",
      });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        error: `Invalid file type: ${req.file.mimetype}. Expected application/pdf`,
      });
    }

    const pdfBuffer = req.file.buffer;

    const result = await SendPrePayBond(pdfBuffer);

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("sendPdfOfPrepay error:", error);
    return res.status(500).json({
      success: false,
      error: "Email failed",
      details: error?.message || "Unknown error",
    });
  }
};

export const sendAttendenceServiceSelection = async (
  req: AuthenticatedRequest,
  res: express.Response,
) => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.identity._id;

    const doc =
      (await getAttendenceByUserId(userId)) ||
      (await getVandCByUserId(userId)) ||
      (await getNoCreByUserId(userId));

    if (!doc) {
      return res.status(404).json({ message: "No service selection found" });
    }

    // ✅ SEND THE FULL DOCUMENT
    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
