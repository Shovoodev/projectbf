import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import router from "./router";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || null;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
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
        console.log("📊 Database:", conn.connection.name);

        // Test the connection
        await testConnection();

        return conn;
      } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
      }
    };

    // Test function to verify connection works
    const testConnection = async () => {
      try {
        // Run a simple command to test
        const result = await mongoose.connection.db.admin().ping();
        console.log("Database ping response:", result);

        // Check collections count
        const collections = await mongoose.connection.db
          .listCollections()
          .toArray();
        console.log({ collections });
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
