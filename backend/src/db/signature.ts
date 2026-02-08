import mongoose from "mongoose";

const signatureSchema = new mongoose.Schema(
  {
    deaceasedSalutation: {
      type: String,
      required: true,
    },
    deaceasedGivenName: { type: String, required: true },
    deaceasedSurname: { type: String, required: true },
    nextToKeenSalutation: {
        type: String,
        required: true,
      },
    nextToKeenGivenName: { type: String, required: true },
    nextToKeenOtherGivenName: { type: String, required: true },
    nextToKeenSurname: { type: String, required: true },
    nextToKeenCurrentAddress: { type: String, required: true },
    nextToKeenMobile: { type: String, required: true },
    nextToKeenEmail: { type: String, required: true },
    nextToKeenRelation: { type: String, required: true },
    nextToKeenPhoto: [{ type: String }],
    nextToKeenSignPhoto: [{ type: String }],

    nextToKeenSign: { type: String },
  },
  { timestamps: true }
);

export const signatureModel = mongoose.model("signature", signatureSchema);

export const createSignatureDetail = (values: Record<string, any>) =>
  new signatureModel(values).save().then((user) => user.toObject());

export const getSignatureByUserId = (userId: string) =>
    signatureModel.findOne({ userid: userId });
export const updateSignatureByUserId = (id: string, values: Record<string, any>) =>
    signatureModel.findByIdAndUpdate(id, values);
