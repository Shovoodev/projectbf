import express from "express";
import { getUsers } from "../db/user";
import { random } from "lodash";
import { creatAdmin, geAdminByEmail } from "../db/admin";
import { authentication } from "../lib";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response,
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
  res: express.Response,
): Promise<any> => {
  try {
    const { adminEmail, password } = req.body;

    if (!adminEmail || !password) {
      return res.status(400);
    }
    const existingUser = await geAdminByEmail(adminEmail);
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Admin already registrated to the database" });
    }
    const salt = random();
    const user = await creatAdmin({
      adminEmail,
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
  res: express.Response,
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

export const adminlogin = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { adminEmail, password } = req.body;

    if (!adminEmail || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await geAdminByEmail(adminEmail).select(
      "+authentication.salt +authentication.password +authentication.sessionToken +authentication.expiresAt",
    );

    if (!user) {
      return res.status(403).json({ error: "User is not registered" });
    }

    // ✅ Make sure authentication exists
    if (!user.authentication?.salt || !user.authentication?.password) {
      return res
        .status(403)
        .json({ error: "Account authentication data missing" });
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({ error: "Email or password is wrong" });
    }

    const ONE_HOUR = 60 * 60 * 1000;
    const salt = random();

    // ✅ If authentication object might be missing, initialize it
    user.authentication = user.authentication || ({} as any);

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString(),
    );
    user.authentication.expiresAt = new Date(Date.now() + ONE_HOUR);

    await user.save();

    res.cookie("sessionToken", user.authentication.sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: ONE_HOUR,
    });

    return res.status(200).json({
      _id: user._id,
      email: user.adminEmail,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
