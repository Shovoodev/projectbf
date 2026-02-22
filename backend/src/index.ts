import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import path from "path";
import Stripe from "stripe";
import nodemailer from "nodemailer";

import { claudinaryConfig } from "./config/cloudinary";
import router from "./router";
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || null;
const AUTH_SECRET = process.env.AUTH_SECRET;

if (!AUTH_SECRET) {
  throw new Error("Please define AUTH_SECRET environment variable");
}

const app = express();
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  }),
);

mongoose.Promise = Promise;

server.listen(PORT, (err?: Error) => {
  if (err) {
    console.error("Error starting server :", err);
  } else {
    console.log("server running on port ", PORT);
    claudinaryConfig();
    const connectDB = async () => {
      try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log("✅ MongoDB Connected:", conn.connection.host);
        await testConnection();

        return conn;
      } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
      }
    };
    const testConnection = async () => {
      try {
        const result = await mongoose.connection.db.admin().ping();
        const collections = await mongoose.connection.db
          .listCollections()
          .toArray();
        console.log(` Collections count: ${collections.length}`);

        return true;
      } catch (error) {
        console.error("Database test failed:", error.message);
        return false;
      }
    };
    connectDB();
  }
});
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api", router());

app.post("/api/test-mail", async (req, res) => {
  try {
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({ error: "Recipient email required" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false, // 587 TLS
      auth: {
        user: "webform@blacktulipfunerals.com.au",
        pass: "BreanaMonkey12#"
      },
    });

    // Check SMTP connection
    await transporter.verify();
    console.log("✅ SMTP connection successful");

    const info = await transporter.sendMail({
      from: `"Administrator" <webform@blacktulipfunerals.com.au>`,
      to,
      subject: "Test Email From Localhost 🚀",
      text: "This is a test email sent from your Express localhost server.",
      html: `
        <h2>SMTP Test Successful</h2>
        <p>This email confirms your Hostinger SMTP is working.</p>
        <p>Sent at: ${new Date().toLocaleString()}</p>
      `,
    });

    return res.json({
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("❌ Mail error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.options("*", cors());

const MONGO_URI = process.env.MONGO_URL as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
