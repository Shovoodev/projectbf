import express from "express";
import nodemailer from "nodemailer";
import { SendPrePayBond } from "../lib/resend";
import { AuthenticatedRequest } from "../lib/types";
import { getAttendenceByUserId } from "../db/attendence";
import { getVandCByUserId } from "../db/viewingAndCremention";
import { getNoCreByUserId } from "../db/noViewingCremention";
import { validateRecipient } from "../lib";
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
    const { pdfAttachment, to } = req.body;
    const response = req.identity;

    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reference = response.reference || "N/A";

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Missing RESEND_API_KEY" });
    }

    if (!pdfAttachment || typeof pdfAttachment !== "string") {
      return res.status(400).json({ error: "pdfAttachment is required" });
    }

    const recipient = typeof to === "string" && to.trim() ? to : response.email;
    const email = validateRecipient(recipient);

    // Convert base64 to buffer for attachment
    const pdfBuffer = Buffer.from(pdfAttachment, "base64");
    if (!pdfBuffer.length) {
      return res.status(400).json({ error: "Invalid pdfAttachment payload" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 587,
      secure: false,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
      requireTLS: true,
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 20_000,
    });
    const data = await transporter.sendMail({
      from: '"Administrator" <Blacktulipfunerals@toukir.cc',
      to: email,
      subject: `Thanks  hi beleaving us for trusting us `,
      text: "we get all you documents",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, Helvetica, sans-serif;
          }
          .wrapper {
            width: 100%;
            padding: 40px 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 650px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          }
          .header {
            background: #111111;
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .header p {
            margin: 8px 0 0;
            font-size: 14px;
            color: #cccccc;
          }
          .content {
            padding: 35px;
            font-size: 15px;
            color: #333333;
            line-height: 1.7;
          }
          .invoice-box {
            background: #fafafa;
            border: 1px solid #eee;
            padding: 15px 20px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 14px;
          }
          .cta {
            margin-top: 25px;
            padding: 15px;
            background: #f8f8f8;
            border-left: 4px solid #111111;
            font-size: 14px;
          }
          .footer {
            background: #fafafa;
            padding: 25px;
            font-size: 12px;
            color: #777;
            text-align: center;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
      
            <div class="header">
              <h1>Tax Invoice</h1>
              <p>Reference Number: ${reference}</p>
            </div>
      
            <div class="content">
      
              <p>Dear Valued Client,</p>
      
              <p>
                Thank you for placing your trust in <strong>Black Tulip Funerals</strong>.
                Please find your official tax invoice attached as a PDF document.
              </p>
      
              <div class="invoice-box">
                <strong>Invoice Reference:</strong> ${reference}<br/>
                <strong>Issue Date:</strong> ${new Date().toLocaleDateString()}
              </div>
      
              <p>
                To ensure all arrangements proceed smoothly and the service date and time
                are secured, we kindly request that payment is arranged at your earliest convenience.
              </p>
      
              <div class="cta">
                If you have any questions regarding this invoice or require assistance,
                please do not hesitate to contact our team.
              </div>
      
              <p style="margin-top:30px;">
                Warm regards,<br/>
                <strong>Scott and the Black Tulip Team</strong>
              </p>
      
            </div>
      
            <div class="footer">
              <strong>Black Tulip Funerals</strong><br/>
              OVANTA PTY LTD<br/>
              25 Renown Avenue, Oatley NSW 2223<br/>
              © ${new Date().getFullYear()} Black Tulip Funerals. All rights reserved.
            </div>
      
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
    res.status(500).json({
      error: "Failed to send invoice",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};
export const sendPdfOfInvoiceOfLandingPage = async (
  req: AuthenticatedRequest,
  res: express.Response,
): Promise<any> => {
  try {
    const { pdfAttachment, to } = req.body;
    const response = req.identity;

    if (!response) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reference = response.reference || "N/A";

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Missing RESEND_API_KEY" });
    }

    if (!pdfAttachment || typeof pdfAttachment !== "string") {
      return res.status(400).json({ error: "pdfAttachment is required" });
    }

    const recipient = typeof to === "string" && to.trim() ? to : response.email;
    const email = validateRecipient(recipient);

    // Convert base64 to buffer for attachment
    const pdfBuffer = Buffer.from(pdfAttachment, "base64");
    if (!pdfBuffer.length) {
      return res.status(400).json({ error: "Invalid pdfAttachment payload" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 587,
      secure: false,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
      requireTLS: true,
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 20_000,
    });
    const data = await transporter.sendMail({
      from: '"Administrator" <Blacktulipfunerals@toukir.cc',
      to: email,
      subject: `Thanks  hi beleaving us for trusting us `,
      text: "we get all you documents",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, Helvetica, sans-serif;
          }
          .wrapper {
            width: 100%;
            padding: 40px 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 650px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          }
          .header {
            background: #111111;
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 22px;
            font-weight: 600;
            letter-spacing: 1px;
          }
          .header p {
            margin: 8px 0 0;
            font-size: 14px;
            color: #cccccc;
          }
          .content {
            padding: 35px;
            font-size: 15px;
            color: #333333;
            line-height: 1.7;
          }
          .invoice-box {
            background: #fafafa;
            border: 1px solid #eee;
            padding: 15px 20px;
            border-radius: 8px;
            margin: 20px 0;
            font-size: 14px;
          }
          .cta {
            margin-top: 25px;
            padding: 15px;
            background: #f8f8f8;
            border-left: 4px solid #111111;
            font-size: 14px;
          }
          .footer {
            background: #fafafa;
            padding: 25px;
            font-size: 12px;
            color: #777;
            text-align: center;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
      
            <div class="header">
              <h1>Tax Invoice</h1>
              <p>Reference Number: ${reference}</p>
            </div>
      
            <div class="content">
      
              <p>Dear Valued Client,</p>
      
              <p>
                Thank you for placing your trust in <strong>Black Tulip Funerals</strong>.
                Please find your official tax invoice attached as a PDF document.
              </p>
      
              <div class="invoice-box">
                <strong>Invoice Reference:</strong> ${reference}<br/>
                <strong>Issue Date:</strong> ${new Date().toLocaleDateString()}
              </div>
      
              <p>
                To ensure all arrangements proceed smoothly and the service date and time
                are secured, we kindly request that payment is arranged at your earliest convenience.
              </p>
      
              <div class="cta">
                If you have any questions regarding this invoice or require assistance,
                please do not hesitate to contact our team.
              </div>
      
              <p style="margin-top:30px;">
                Warm regards,<br/>
                <strong>Scott and the Black Tulip Team</strong>
              </p>
      
            </div>
      
            <div class="footer">
              <strong>Black Tulip Funerals</strong><br/>
              OVANTA PTY LTD<br/>
              25 Renown Avenue, Oatley NSW 2223<br/>
              © ${new Date().getFullYear()} Black Tulip Funerals. All rights reserved.
            </div>
      
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
    res.status(500).json({
      error: "Failed to send invoice",
      details: error instanceof Error ? error.message : String(error),
    });
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
    });
  }
};

export const sendAttendenceServiceSelection = async (
  req: AuthenticatedRequest,
  res: express.Response
) => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = String(req.identity._id);

    const doc =
      (await getAttendenceByUserId(userId)) ||
      (await getVandCByUserId(userId)) ||
      (await getNoCreByUserId(userId));

    if (!doc) {
      return res.status(404).json({
        message: "No service selection found",
        userId,
      });
    }

    return res.status(200).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};


export const notifyAdminNewAgreement = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    const {
      pdfAttachment,
      reference,
      clientEmail,
    }: {
      pdfAttachment?: string;
      reference?: string;
      clientEmail?: string;
    } = req.body;

    let attachments: any[] = [];

    // ✅ Only process PDF if provided
    if (pdfAttachment && typeof pdfAttachment === "string") {
      const cleanBase64 = pdfAttachment.includes("base64,")
        ? pdfAttachment.split("base64,")[1]
        : pdfAttachment;

      const pdfBuffer = Buffer.from(cleanBase64, "base64");

      if (pdfBuffer.length) {
        attachments.push({
          filename: `agreement-${reference || "agreement"}.pdf`,
          content: pdfBuffer,
        });
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_WEBFORM_USER,
        pass: process.env.EMAIL_WEBFORM_PASS,
      },
      requireTLS: true,
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 20_000,
    });

    await transporter.sendMail({
      from: `"Administrator" <${process.env.EMAIL_WEBFORM_USER}>`,
      to: process.env.AGREEMENT_NOTIFY_EMAIL || "reception@blacktulipfunerals.com.au",
      subject: `New Agreement Submitted - Ref ${reference || ""}`.trim(),
      text: `A new agreement has been submitted.
Reference: ${reference || "N/A"}
Client Email: ${clientEmail || "N/A"}`,
      html: `
        <p><strong>New Agreement Submission</strong></p>
        <p>Reference: ${reference || "N/A"}</p>
        <p>Client Email: ${clientEmail || "N/A"}</p>
        <p>Submitted: ${new Date().toLocaleString()}</p>
      `,
      attachments, // ✅ will be empty array if no pdf
    });

    return res.json({
      success: true,
      message: "Admin notified successfully",
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      error: "Failed to notify admin",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export const notifyClientAccountCreated = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    const {
      pdfAttachment,
      email,
      customerName,
      reference,
    }: {
      pdfAttachment?: string;
      email?: string;
      customerName?: string;
      reference?: string;
    } = req.body ?? {};

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Missing RESEND_API_KEY" });
    }

    // ✅ Still required
    if (!email || !customerName) {
      return res
        .status(400)
        .json({ error: "email and customerName are required" });
    }

    // ✅ Optional attachments array
    const attachments: Array<{ filename: string; content: Buffer }> = [];

    // ✅ Only attach if pdfAttachment is provided and valid
    if (pdfAttachment && typeof pdfAttachment === "string") {
      // handle "data:application/pdf;base64,...."
      const cleanBase64 = pdfAttachment.includes("base64,")
        ? pdfAttachment.split("base64,")[1]
        : pdfAttachment;

      const pdfBuffer = Buffer.from(cleanBase64, "base64");

      // attach only if it decodes to something non-empty
      if (pdfBuffer.length) {
        attachments.push({
          filename: `invoice-${reference || "invoice"}.pdf`,
          content: pdfBuffer,
        });
      }
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_WEBFORM_USER,
        pass: process.env.EMAIL_WEBFORM_PASS,

      },
      requireTLS: true,
      connectionTimeout: 20_000,
      greetingTimeout: 20_000,
      socketTimeout: 20_000,
    });

    await transporter.sendMail({
      from: `"Administrator" <${process.env.EMAIL_WEBFORM_USER}>`,
      to: email,
      subject: "Your Registraion in  Black Tulip Funerals has been completed sucessfully",
      text: `
Dear ${customerName},

Thank you for entrusting Black Tulip Funerals with the funeral arrangement.

Your client account has been successfully created.

${attachments.length
          ? "Kindly find the attached invoice and arrange payment at your earliest convenience to ensure everything proceeds smoothly."
          : "An invoice will be shared with you shortly."
        }

If you need any assistance, please let us know.
Best regards,
Black Tulip Funerals
      `.trim(),
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background:#f4f4f4; padding:30px; }
            .container { max-width: 650px; margin: auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08); }
            .header { background:#111111; color:#ffffff; padding:25px; text-align:center; }
            .content { padding:35px; font-size:15px; line-height:1.6; color:#333; }
            .footer { padding:20px; font-size:12px; color:#777; background:#fafafa; text-align:center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Black Tulip Funerals</h2>
              <p>Client Account Confirmation</p>
            </div>

            <div class="content">
              <p>Dear <strong>${customerName}</strong>,</p>

              <p>
                Thank you for entrusting <strong>Black Tulip Funerals</strong> with the funeral arrangement.
              </p>

              ${attachments.length
          ? `<p>
                Your client account has been successfully created.
                      Kindly find the attached invoice and arrange payment at your earliest convenience
                      to ensure everything proceeds smoothly.
                    </p>`
          : `<p>
                Your client account has been successfully created.
                      An invoice will be shared with you shortly.
                    </p>`
        }

              <p>
                If you require any assistance or have any questions,
                please do not hesitate to contact us.
              </p>

              <br/>

              <p>
                Best regards,<br/>
                <strong>Black Tulip Funerals</strong>
              </p>
            </div>

            <div class="footer">
              © ${new Date().getFullYear()} Black Tulip Funerals<br/>
              25 Renown Avenue, Oatley NSW 2223
            </div>
          </div>
        </body>
        </html>
      `,
      attachments, // ✅ empty array is fine
    });

    return res.json({
      success: true,
      message: "Client notified successfully",
      attachedInvoice: attachments.length > 0,
    });
  } catch (error) {
    console.error("Client email error:", error);
    return res.status(500).json({
      error: "Failed to send client email",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};