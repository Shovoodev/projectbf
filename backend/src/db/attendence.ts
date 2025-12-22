import mongoose from "mongoose";

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

export const FormResponseModel = mongoose.model(
  "attendence",
  formResponseSchema
);

export const createResponseAttandence = (values: Record<string, any>) =>
  new FormResponseModel(values).save().then((user) => user.toObject());

export const getAttendenceByUserId = (userId: string) =>
  FormResponseModel.findOne({ userid: userId });
