import mongoose from "mongoose";

const formVandCSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    urn: {
      type: String,
      required: true,
      default: "Funera Preferred Adult Urn",
    },
    collectionOfUrn: {
      type: String,
      required: true,
      default: "Collect in Person",
    },
    totalPriceImpact: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "submitted", "confirmed", "cancelled"],
      default: "draft",
    },
    submittedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);

export const FormVandCResponseModel = mongoose.model(
  "ViewingAndCremention",
  formVandCSchema,
);

export const createResponseVandC = (values: Record<string, any>) =>
  new FormVandCResponseModel(values).save().then((user) => user.toObject());

export const getVandCByUserId = (userId: string) =>
  FormVandCResponseModel.findOne({ userid: userId });

export const getVandCByReference = (reference: string) =>
  FormVandCResponseModel.findOne({ reference: reference });

export const updateVandCByUserId = (id: string, values: Record<string, any>) =>
  FormVandCResponseModel.findByIdAndUpdate(id, values);
