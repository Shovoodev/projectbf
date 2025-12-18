import mongoose from "mongoose";
import { salutationEnum } from "./common";

const deceasedPersonSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    salutation: { type: String, required: true, enum: salutationEnum },
    givenName: { type: String, required: true },
    Surname: { type: String, required: true },
    DateOfDeath: { type: String, required: true },
    Address: { type: String, required: true },
    deceasedPassedReason: { type: String, required: true },
    deceasedNow: { type: String, required: true },
    batterypowereddevices: { type: String, required: true },
    regulardoctoraddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const deceasedPersonModel = mongoose.model(
  "deceasedPerson",
  deceasedPersonSchema
);
