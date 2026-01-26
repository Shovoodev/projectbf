import mongoose from "mongoose";

const formAttendenceSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    questionId: { type: Number, required: false },
    textAnswer: { type: Number, required: false },
    responses: [
      {
        questionId: { type: Number, required: false },
        questionText: { type: String, required: false },
        textAnswer: { type: String },
        totalPriceImpact: { type: Number, default: 0 },
      },
    ],
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
  }
);

export const formAttendenceModel = mongoose.model(
  "attendencequestion",
  formAttendenceSchema
);

export const getformAttendencedata = (userId: string) =>
  FormResponseModel.findOne({ userid: userId });

const formResponseSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    stationery: { type: String, required: true, default: "50-memoriam-cards" },
    bodyPreparation: {
      type: String,
      required: true,
      default: "General Wash | Dress | Makeup",
    },
    coffin: { type: String, required: true, default: "Contract - Raw" },
    flowers: {
      type: String,
      required: true,
      default: "100cm Mixed Seasonal Coffin Cover - White",
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
    baseTotal: { type: Number, default: 4499 },
    totalPriceImpact: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    transferOption: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["draft", "submitted", "confirmed", "cancelled"],
      default: "draft",
    },
    service: { type: String, default: "Attending Service Cremation" },
    submittedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const FormResponseModel = mongoose.model(
  "attendenceresponse",
  formResponseSchema
);

export const createResponseAttandence = (values: Record<string, any>) =>
  new FormResponseModel(values).save().then((user) => user.toObject());

export const getAttendenceByUserId = (userId: string) =>
  FormResponseModel.findOne({ userid: userId });

export const getAttendenceByReference = (reference: string) =>
  FormResponseModel.findOne({ reference: reference });

export const updateAttendenceByUserId = (
  id: string,
  values: Record<string, any>
) => FormResponseModel.findByIdAndUpdate(id, values);
