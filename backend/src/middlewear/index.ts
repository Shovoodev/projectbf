import express from "express";
import { merge } from "lodash";
import { getUserBySessionToken } from "./../db/user";
import { AuthenticatedRequest } from "../lib/types";

// export const isAuthenticated = async (
//   req: AuthenticatedRequest,
//   res: express.Response,
//   next: express.NextFunction
// ): Promise<any> => {
//   try {
//     const sessionToken = req.cookies["VIDEO"];
//     if (!sessionToken) {
//       return res.status(403);
//     }
//     const existingUser = await getUserBySessionToken(sessionToken);
//     if (!existingUser) {
//       return res.status(403);
//     }
//     merge(req, { identity: existingUser });
//     console.log({ sessionToken });
//     return next();
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(400);
//   }
// };
export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { sessionToken } = req.cookies;

    if (!sessionToken) {
      return res.status(401).json({ message: "No session token provided" });
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.status(401).json({ message: "Invalid session token" });
    }

    req.identity = {
      _id: user._id.toString(),
      email: user.email,
      reference: user.reference,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const AccessAuthentication = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    if (!req.identity) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Only admins allowed
    if (req.identity.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: Admin access required",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
