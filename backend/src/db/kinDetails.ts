import mongoose from "mongoose";
import { salutationEnum } from "./common";

const kinDetailsSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    salutation: {
      type: String,
      required: true,
      enum: salutationEnum,
    },
    givenName: { type: String, required: true },
    surname: { type: String, required: true },
    currentAddress: { type: String, required: true },
    mobile: { type: String, required: true },
    relation: { type: String, required: true },
    photo: { type: String, required: true },
    sign: { type: String, required: true },
  },
  { timestamps: true }
);

export const KinDetailsModel = mongoose.model("KinDetails", kinDetailsSchema);

export const createKinDetail = (values: Record<string, any>) =>
  new KinDetailsModel(values).save().then((user) => user.toObject());
