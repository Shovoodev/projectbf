import express from "express";
import { createUser, getUserByEmail, getUserBySessionToken } from "../db/user";
import { authentication, invoiceId, random } from "../lib";
import nodemailer from "nodemailer";
import { AuthenticatedRequest } from "../lib/types";
import SendEmail from "../lib/resend";

// export const login = async (
//   req: express.Request,
//   res: express.Response
// ): Promise<any> => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(403).json({ error: "email or password is wrong" });
//     }
//     const user = await getUserByEmail(email).select(
//       "+authentication.salt +authentication.password"
//     );
//     if (!user) {
//       return res.status(403).json({ error: "User is not registered" });
//     }
//     const expectdHash = authentication(user.authentication.salt, password);

//     if (user.authentication.password !== expectdHash) {
//       return res.status(403).json({ error: "email or password is wrong" });
//     }
//     const salt = random();
//     user.authentication.sessionToken = authentication(
//       salt,
//       user._id.toString()
//     );
//     await user.save();

//     res.cookie("auth", user.authentication.sessionToken, {
//       domain: "localhost",
//       path: "/",
//       sameSite: "lax", // Adjust as needed; "lax" works for most cases
//     });

//     res.status(200).json({
//       _id: user._id,
//       email: user.email,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400);
//   }
// };
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ error: "Email or password is wrong" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(403).json({ error: "User is not registered" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({ error: "Email or password is wrong" });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    // send session token as HTTP-only cookie
    res.cookie("sessionToken", user.authentication.sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong" });
  }
};

export const sendAllRelatedDocuments = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { user } = req.body;

    const response = SendEmail(user);
    console.log(response);
    return res.status(200).json({ message: "massage deleverd" });
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
      return res
        .status(400)
        .json({ message: "User already registrated to the database" });
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
