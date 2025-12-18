import express from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "./../db/user";
import { AuthenticatedRequest } from "../lib/types";

export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const sessionToken = req.cookies["VIDEO"];
    if (!sessionToken) {
      return res.status(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.status(403);
    }
    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const AccessAuthentication = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {};
