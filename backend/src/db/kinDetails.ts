import mongoose from "mongoose";
import { salutationEnum } from "./common";

const kinDetailsSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    salutation: { type: String, required: true, enum: salutationEnum },
    givenName: { type: String, required: true },
    Surname: { type: String, required: true },
    currentAddress: { type: String, required: true },
    Mobile: { type: BigInt, required: true, min: 0, max: 9999999999 },
    relation: { type: String, required: true },
    photo: { type: String, requied: true },
    sign: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const deceasedPersonModel = mongoose.model(
  "kindetails",
  kinDetailsSchema
);
