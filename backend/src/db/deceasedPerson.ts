import mongoose from "mongoose";

const deceasedPersonSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    salutation: { type: String, },
    givenName: { type: String,},
    surname: { type: String,  },
    dateofdeath: { type: String },
    dateofbirth: { type: String },
    deceasedpersonaddress: { type: String },
    deceasedPassedReason: { type: String },
    deceasedNow: { type: String },
    batterypowereddevices: { type: String },
    regulardoctoraddress: { type: String },
    photo: [{ type: String }] // array of strings

  },
  {
    timestamps: true,
  },
);

export const deceasedPersonModel = mongoose.model(
  "deceasedPerson",
  deceasedPersonSchema,
);
export const createDeceasedpersondetail = (values: Record<string, any>) =>
  new deceasedPersonModel(values).save().then((user) => user.toObject());

export const getDeceasedByUserId = (userId: string) =>
  deceasedPersonModel.findOne({ userid: userId });

export const updateDeceasedByUserId = (
  id: string,
  values: Record<string, any>,
) => deceasedPersonModel.findByIdAndUpdate(id, values);
