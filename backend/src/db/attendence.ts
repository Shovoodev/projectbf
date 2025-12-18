import mongoose from "mongoose";

const formQuestionSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    questionId: { type: Number, required: true, unique: true },
    section: { type: String, required: true },
    questionText: { type: String, required: true },
    options: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true }, // Internal value
        priceImpact: { type: Number, default: 0 }, // Price adjustment
      },
    ],
    isRequired: { type: Boolean, default: false },
    minSelections: { type: Number, default: 1 },
    maxSelections: { type: Number, default: 1 },
    displayOrder: { type: Number, required: true },
    helpText: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const formResponseSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    responses: [
      {
        questionId: { type: Number, required: false },
        questionText: { type: String, required: true },
        questionType: { type: String, required: false },

        // Store different response types
        singleAnswer: { type: String }, // For select/radio
        textAnswer: { type: String }, // For text input
        numericAnswer: { type: Number }, // For number input

        // Store selected option details
        selectedOptions: [
          {
            label: { type: String },
            value: { type: String },
            priceImpact: { type: Number },
          },
        ],
        totalPriceImpact: { type: Number, default: 0 },
      },
    ],

    // Summary
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

export const FormQuestionModel = mongoose.model(
  "attendence",
  formQuestionSchema
);

export const FormResponseModel = mongoose.model(
  "FormResponse",
  formResponseSchema
);
