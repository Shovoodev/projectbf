import mongoose from "mongoose";

const formNoServiceSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    email: {
      type: String,
     
      lowercase: true,
      trim: true,
    },
    urn: {
      type: String,
     
      default: "Funera Preferred Adult Urn",
    },
    transferOption: {
      type: String,
    
      default: "Sydney Metro",
    },
    collectionOfUrn: {
      type: String,
     
      default: "Collect in Person",
    },
    totalPriceImpact: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["draft", "submitted", "confirmed", "cancelled"],
      default: "draft",
    },
    baseTotal: { type: Number, default: 2299 },
    service: { type: String, default: "No Viewing Cremention" },

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

export const getNoCreByUserId = (userId: string) =>
  FormNoServiceResponseModel.findOne({ userid: userId });

export const getNoCreByReference = (reference: string) =>
  FormNoServiceResponseModel.findOne({ reference: reference });

export const updateNoCreByUserId = (id: string, values: Record<string, any>) =>
  FormNoServiceResponseModel.findByIdAndUpdate(id, values);
