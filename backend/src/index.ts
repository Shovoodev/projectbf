import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";

import router from "./router";
import Stripe from "stripe";

import { claudinaryConfig } from "./config/cloudinary";
import { Resend } from "resend";
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || null;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
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
  })
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
  res.status(200).send("OK");
});

app.use("/", router());
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
