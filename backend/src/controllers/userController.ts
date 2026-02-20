import express from "express";
import {
  createUser,
  getUserByEmail,
  getUserBySessionToken,
  userModel,
} from "../db/user";
import { authentication, invoiceId, random } from "../lib";
import nodemailer from "nodemailer";
import { AuthenticatedRequest } from "../lib/types";
// import SendEmail from "../lib/resend";
import { getAttendenceByUserId } from "../db/attendence";
import { getKinByUserId } from "../db/kinDetails";
import { getDeceasedByUserId } from "../db/deceasedPerson";

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
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password",
    );

    if (!user?.authentication?.salt || !user?.authentication?.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // ✅ IMPORTANT: Do NOT set cookies, do NOT create sessionToken
    // res.cookie(...)  <-- remove this

    return res.status(200).json({
      _id: user._id,
      email: user.email ?? "",
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const registerUser = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const reference = invoiceId();
    const salt = random();

    const user = await createUser({
      email: email.trim().toLowerCase(),
      reference,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user);
  } catch (error: any) {
    console.error(error);

    // If you still have a unique index, Mongo will throw E11000
    if (error?.code === 11000) {
      return res.status(409).json({
        message:
          "Duplicate key error (your DB still has a unique index on email). Remove the unique index to allow duplicates.",
      });
    }

    return res.status(400).json({ message: "Bad request" });
  }
};


export const logOut = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    res.clearCookie("sessionToken", {
      path: "/",
      sameSite: "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred during logout" });
  }
};

// export const sendAllRelatedDocuments = async (
//   req: AuthenticatedRequest,
//   res: express.Response
// ): Promise<any> => {
//   try {
//     if (!req.identity) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const userId = req.identity._id.toString();

//     const attendence = await getAttendenceByUserId(userId);
//     const kinDetails = await getKinByUserId(userId);
//     const deceasedPerson = await getDeceasedByUserId(userId);

//     console.log({ attendence, kinDetails, deceasedPerson });
//     if (!req.file) {
//       return res.status(400).json({ message: "PDF file missing" });
//     }

//     const pdfBuffer = req.file.buffer;
//     // const send = SendEmail(req.identity.email, pdfBuffer);
//     // const response = SendEmail(userId);

//     return res.status(200).json({
//       message: "Data fetched successfully",
//       data: { send },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Failed to fetch documents" });
//   }
// };

// export const getAllSelectedServices = async (
//   req: AuthenticatedRequest,
//   res: express.Response
// ): Promise<any> => {
//   try {
//     if (!req.identity) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const userId = req.identity._id.toString();

//     console.log("USER ID:", userId);

//     const attendence = await getAttendenceByUserId(userId);
//     const kinDetails = await getKinByUserId(userId);
//     const deceasedPerson = await getDeceasedByUserId(userId);

//     return res.status(200).json({
//       message: "Data fetched successfully",
//       data: { attendence, kinDetails, deceasedPerson },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Failed to fetch documents" });
//   }
// };
