import { creatEnquirey, enquireyModel, getEnquirey } from "../db/enquire";
import express from "express";

import nodemailer from "nodemailer";
import { Request, Response } from "express";
export const newClientEnquirey = async (
  req: express.Request,
  res: express.Response,
): Promise<Response> => {
  try {
    const { email, source, message, name, phone } = req.body;

    const savedResponse = await creatEnquirey({
      name,
      email,
      phone,
      message,
      source,
    });

    return res.status(201).json({
      message: "New enquiry created successfully",
      data: savedResponse,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to create enquiry",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const getAllEnquires = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    const filtered = await getEnquirey();

    res.json(filtered);
  } catch (error) {
    console.log(error);
  }
};

export const callMeEnquiryEmail = async (
  req: express.Request,
  res: express.Response,
): Promise<Response> => {
  try {
    const { firstName, lastName, phone, message } = req.body as {
      firstName?: string;
      lastName?: string;
      phone?: string;
      message?: string;
    };
    if (!firstName || !lastName || !phone || !message) {
      return res.status(400).json({
        message: "firstName, lastName, phone, and message are required",
      });
    }

    const arrangerEmail = "shovoodev@gmail.com";
    if (!arrangerEmail) {
      return res.status(500).json({
        message: "ARRANGER_EMAIL is not configured",
      });
    }

    // ✅ Create transporter (SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SENDEMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });

    const subject = `📞 Call Me Request: ${firstName} ${lastName}`;

    const text = `
New Call Me enquiry received

Name: ${firstName} ${lastName}
Phone: ${phone}

Message:
${message}
    `.trim();

    const html = `
  <div style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:30px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:#111111;color:#ffffff;padding:20px 30px;">
                <h2 style="margin:0;font-size:20px;font-weight:600;">
                  📞 New Call Me Request
                </h2>
                <p style="margin:5px 0 0 0;font-size:13px;color:#cccccc;">
                  A client has requested a call back.
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                
                <p style="margin:0 0 20px 0;font-size:14px;color:#333;">
                  You have received a new enquiry from the website. 
                  Please review the details below and contact the client at your earliest convenience.
                </p>

                <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                  <tr>
                    <td style="background:#f8f8f8;border:1px solid #eee;"><strong>Client Name</strong></td>
                    <td style="border:1px solid #eee;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="background:#f8f8f8;border:1px solid #eee;"><strong>Phone Number</strong></td>
                    <td style="border:1px solid #eee;">${phone}</td>
                  </tr>
                </table>

                <div style="margin-top:25px;">
                  <p style="margin-bottom:8px;font-size:14px;"><strong>Client Message:</strong></p>
                  <div style="padding:15px;background:#fafafa;border:1px solid #eee;border-radius:6px;color:#444;font-size:14px;line-height:1.5;">
                    ${String(message).replace(/\n/g, "<br/>")}
                  </div>
                </div>

                <p style="margin-top:30px;font-size:13px;color:#666;">
                  Please contact the client promptly to provide assistance and support.
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8f8f8;padding:20px 30px;text-align:center;font-size:12px;color:#888;">
                This message was generated automatically from the website Call Me form.<br/>
                © ${new Date().getFullYear()} Black Tulip Funerals. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </div>
`;

    const SMTP_HOST = process.env.SENDEMAIL_HOST;
    const SMTP_USER = process.env.SENDEMAIL_USER;
    const SMTP_PASS = process.env.SENDEMAIL_PASSWORD;
    await transporter.sendMail({
      host: SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      html,
      replyTo: process.env.REPLY_TO || undefined,
    });

    return res.status(200).json({
      message: "Enquiry sent successfully",
    });
  } catch (error) {
    console.error("CallMe email error:", error);
    return res.status(500).json({
      message: "Failed to send enquiry email",
      error: error instanceof Error ? error.message : error,
    });
  }
};