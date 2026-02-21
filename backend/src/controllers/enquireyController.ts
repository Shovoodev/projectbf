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

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        message: "firstName, lastName, and phone are required",
      });
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

    const arrangerEmail = process.env.RECEPTION_EMAIL

    const subject = `📞 Call Me Request: ${firstName} ${lastName}`;

    const safeMessage = (message ?? "").trim();

    const text = `
New Call Me enquiry received

Name: ${firstName} ${lastName}
Phone: ${phone}

Message:
${safeMessage || "(No message provided)"}
    `.trim();

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;">
        <h2>📞 New Call Me Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>
          ${safeMessage ? String(safeMessage).replace(/\n/g, "<br/>") : "<em>No message provided</em>"}
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: '"Administrator" <Blacktulipfunerals@toukir.cc>',
      to: arrangerEmail,
      subject,
      text,
      html,
      replyTo: process.env.REPLY_TO || undefined,
    });

    return res.status(200).json({ message: "Enquiry sent successfully" });
  } catch (error) {
    console.error("CallMe email error:", error);
    return res.status(500).json({
      message: "Failed to send enquiry email",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};