import mongoose from "mongoose";
import { coffinOptions } from "../data/attandenceData";

const viewAndCrementionSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    bodyPreparation: { type: String, required: true },
    coffin: { type: String, enum: coffinOptions },
    urm: { type: String, required: true },
    collectionOfUrm: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const viewAndCrementionModel = mongoose.model(
  "viewAndCremention",
  viewAndCrementionSchema
);

export const createResponseAttandence = (values: Record<string, any>) =>
  new viewAndCrementionModel(values).save().then((user) => user.toObject());

export const getAttendenceByUserId = (userId: string) =>
  viewAndCrementionModel.findOne({ userid: userId });
