import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import router from "./router";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
const server = http.createServer(app);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

server.listen(PORT, (err?: Error) => {
  if (err) {
    console.error("Error starting server :", err);
  } else {
    console.log("server running on port ", PORT);
  }
});
app.get("/", (_req, res) => {
  res.status(200).send("OK");
});
app.use("/", router());
