import express from "express";
import { getUsers } from "../db/user";
import { random } from "lodash";
import { creatAdmin, geAdminByEmail } from "../db/admin";
import { authentication } from "../lib";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const user = await getUsers();
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerAdmin = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400);
    }
    const existingUser = await geAdminByEmail(email);
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already registrated to the database" });
    }
    const salt = random();
    const user = await creatAdmin({
      email,
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

export const MarkInvoicePaid = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { paymentIntentId, amount, status } = req.body;

  if (status === "succeeded") {
    console.log("🧾 TEST INVOICE PAID");
    console.log("PaymentIntent:", paymentIntentId);
    console.log("Amount:", amount);

    // TEST ONLY — simulate DB update
    return res.json({
      success: true,
      message: "Invoice marked as PAID (TEST)",
    });
  }

  res.status(400).json({
    success: false,
    message: "Payment not completed",
  });
};
