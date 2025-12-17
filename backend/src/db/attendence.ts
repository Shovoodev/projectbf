import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema({
  reference: { type: Number, required: true, min: 0, max: 999999 },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const attendenceModel = mongoose.model("attendence", attendenceSchema);
