import express from "express";
import { createUser, getUserByEmail, getUserBySessionToken } from "../db/user";
import { authentication, invoiceId, random } from "../lib";

import nodemailer from "nodemailer";
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
export const registrationByToken = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { to, user } = req.body;
    const token = "hello";

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: "re_RNSeBKAn_6oWiyfp3GEoXv1C5DuCNnnT8",
      },
    });
    const info = await transporter.sendMail({
      from: '"Toukir Shuvo" <expensly@toukir.cc>',
      to: `${to}`,
      subject: `Your friend ${user} send you requiest to join Expense Tracker `,
      text: "Expense tracker is a platform to manage your expenses with your friend more easily and smartly",
      html: `<h4>You are invited to join<h4><br/>
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
    const reference = invoiceId;
    if (existingUser) {
      return res.status(400);
    }
    const salt = random();
    const user = await createUser({
      email,
      reference: reference,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400);
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
