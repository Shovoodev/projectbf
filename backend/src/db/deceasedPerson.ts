import mongoose from "mongoose";

const deceasedPersonSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    salutation: { type: String, required: true },
    givenName: { type: String, required: true },
    surname: { type: String, required: true },
    dateOfDeath: { type: String, required: true },
    address: { type: String, required: true },
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
export const createDeceasedpersondetail = (values: Record<string, any>) =>
  new deceasedPersonModel(values).save().then((user) => user.toObject());
