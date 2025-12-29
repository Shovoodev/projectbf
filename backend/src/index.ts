import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./router";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || null;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
app.use(
  cors({
    origin: "*",
  })
);
mongoose.Promise = Promise;

server.listen(PORT, (err?: Error) => {
  if (err) {
    console.error("Error starting server :", err);
  } else {
    console.log("server running on port ", PORT);
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
