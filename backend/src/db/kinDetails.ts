import mongoose from "mongoose";

const kinDetailsSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    salutation: {
      type: String,
      required: true,
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
