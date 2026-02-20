import express from "express";
import {
  createUser,
  getLatestUserByEmail,

} from "../db/user";
import { authentication, invoiceId, random } from "../lib";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await getLatestUserByEmail(email).select(
      "+authentication.salt +authentication.password +authentication.sessionToken",
    );

    if (!user || !user.authentication?.salt || !user.authentication?.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const expectedHash = authentication(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString());
    await user.save();

    res.cookie("sessionToken", user.authentication.sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      _id: user._id,
      email: user.email ?? "",
      reference: user.reference ?? "",
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

// controller/auth.ts
export const registerUser = async (
  req: express.Request,
  res: express.Response,
): Promise<any> => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const reference = invoiceId();

    const salt = random();

    const user = await createUser({
      email: normalizedEmail,
      reference,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(201).json(user).end();
  } catch (error) {
    console.log(error);
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