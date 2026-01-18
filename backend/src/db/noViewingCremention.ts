import mongoose from "mongoose";

const formNoServiceSchema = new mongoose.Schema(
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
    transferOption: {
      type: String,
      required: true,
      default: "Sydney Metro",
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

export const FormNoServiceResponseModel = mongoose.model(
  "formNoServiceCremention",
  formNoServiceSchema,
);

export const createResponseVandC = (values: Record<string, any>) =>
  new FormNoServiceResponseModel(values).save().then((user) => user.toObject());

export const getVandCByUserId = (userId: string) =>
  FormNoServiceResponseModel.findOne({ userid: userId });

export const getVandCByReference = (reference: string) =>
  FormNoServiceResponseModel.findOne({ reference: reference });

export const updateVandCByUserId = (id: string, values: Record<string, any>) =>
  FormNoServiceResponseModel.findByIdAndUpdate(id, values);
