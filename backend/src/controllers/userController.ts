import express from "express";
import { createUser, getUserByEmail, getUserBySessionToken } from "../db/user";
import { authentication, invoiceId, random } from "../lib";

import nodemailer from "nodemailer";
import { AuthenticatedRequest } from "../lib/types";
export const login = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ error: "email or password is wrong" });
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.status(403).json({ error: "User is not registered" });
    }
    const expectdHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectdHash) {
      return res.status(403).json({ error: "email or password is wrong" });
    }
    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("auth", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      sameSite: "lax", // Adjust as needed; "lax" works for most cases
    });

    res.status(200).json({
      _id: user._id,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(400);
  }
};
export const sendAllRelatedDocuments = async (
  req: AuthenticatedRequest,
  res: express.Response
): Promise<any> => {
  try {
    const { to } = req.body;
    const { user } = req.identity;
    const token = "hello";

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    });
    const info = await transporter.sendMail({
      from: '"Administrator" <Blacktulipfunerals@toukir.cc',
      to: `${to}`,
      subject: `Thanks  ${user} beleaving us for trusting us `,
      text: "we get all you documents",
      html: `<h4>This is all the document we have recived<h4><br/>
      <a href="http://localhost:5173/invite/register?token=${token}">Click to Join Group</a>
     `,
    });
    return res.status(200).json(info);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};

export const registerUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400);
    }
    const existingUser = await getUserByEmail(email);
    console.log(existingUser);
    const reference = invoiceId();
    if (existingUser) {
      return res.status(400);
    }
    const salt = random();
    const user = await createUser({
      email,
      reference,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Bad request" });
  }
};
export const logOut = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    res.clearCookie("VIDEO", {
      domain: "localhost",
      path: "/",
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred during logout" });
  }
};
