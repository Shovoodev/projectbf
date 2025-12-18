import express from "express";

import { getUserByEmail, getUserById, getUsers } from "../db/user";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const signOutUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};
export const registerUserDetails = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400);
    }
    const existingUser = await getUserByEmail(email);
    console.log(existingUser);
    const userid = existingUser._id.toString();
    const user = await getUserByEmail(email);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
