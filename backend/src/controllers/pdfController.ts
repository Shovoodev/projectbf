import express from "express";
import nodemailer from "nodemailer";
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
    const { pdfAttachment, recipientEmail, invoiceNumber } = req.body;
    const identity = req.identity;

    if (!identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!pdfAttachment) {
      return res.status(400).json({ message: "PDF attachment is required" });
    }

    const reference = identity.reference || invoiceNumber || "INV-001";
    const userEmail = "mdathikhasan136@gmail.com";

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
      from: '"Black Tulip Funerals" <Blacktulipfunerals@toukir.cc>',
      to: userEmail,
      subject: `Invoice ${reference} - KeyInvest Funeral Bond`,
      text: "Please find your invoice attached",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #f8f9fa; padding: 20px; text-align: center; border-bottom: 2px solid #003da5; }
              .header h1 { color: #003da5; margin: 0; }
              .content { padding: 20px; }
              .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>KeyInvest Funeral Bond</h1>
                <p>Invoice Number: <strong>${reference}</strong></p>
              </div>
              <div class="content">
                <h2>Invoice Details</h2>
                <p>Dear Valued Customer,</p>
                <p>Please find your tax invoice attached as a PDF.</p>
                <p>We kindly ask that payment is made immediately to secure the funeral service date and time.</p>
              </div>
              <div class="footer">
                <p>Best regards,<br><strong>Black Tulip Funerals</strong></p>
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

    console.log("Email sent:", data);

    res.json({
      success: true,
      message: "Invoice sent successfully",
      messageId: data.messageId,
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
): Promise<any> => {
  try {
    res.json({ success: true, message: "Selections retrieved" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to retrieve selections" });
  }
};
