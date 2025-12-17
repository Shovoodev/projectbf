import express from "express";

import {
  getUserByEmail,
  getUserById,
  getUsers,
  updateUserDetailsByUserId,
} from "../db/user";

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
export const getSingleUser = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if (!user) {
      console.log("no user found");
    }
    if (user) {
      return res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
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
    if (existingUser) {
      const data = await updateUserDetailsByUserId(userid, {
        email,
      });
      return res.status(200).json(data);
    }
    const user = await getUserByEmail(email);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
