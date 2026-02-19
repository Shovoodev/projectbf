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
  },
);

export const formAttendenceModel = mongoose.model(
  "attendencequestion",
  formAttendenceSchema,
);

export const getformAttendencedata = (userId: string) =>
  FormResponseModel.findOne({ userid: userId });

const formResponseSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    reference: { type: String, required: true, unique: true },
    email: { type: String, required: true },

    stationeryOption: { type: String },
    stationery: { type: Number, default: 0 },

    bodyPreparationOption: { type: String },
    bodyPreparation: { type: Number, default: 0 },

    coffinOption: { type: String },
    coffin: { type: Number, default: 0 },

    flowersOption: { type: String },
    flowers: { type: Number, default: 0 },

    urnOption: { type: String },
    urn: { type: Number, default: 0 },

    collectionOfUrnOption: { type: String },
    collectionOfUrn: { type: Number, default: 0 },

    transferOption: { type: String },
    transferOptionPrice: { type: Number, default: 0 },

    baseTotal: { type: Number, default: 4895 },
    totalPriceImpact: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["draft", "submitted", "confirmed", "cancelled"],
      default: "draft",
    },

    service: { type: String, default: "Attending Service Cremation" },
    submittedAt: { type: Date },
  },
  { timestamps: true },
);

export const FormResponseModel = mongoose.model(
  "attendenceresponse",
  formResponseSchema,
);

export const createResponseAttandence = (values: Record<string, any>) =>
  new FormResponseModel(values).save().then((user) => user.toObject());

export const getAttendenceByUserId = (userId: string) =>
  FormResponseModel.findOne({ userid: userId });

export const getAttendenceByReference = (reference: string) =>
  FormResponseModel.findOne({ reference: reference });

export const updateAttendenceByUserId = (
  id: string,
  values: Record<string, any>,
) => FormResponseModel.findByIdAndUpdate(id, values);
