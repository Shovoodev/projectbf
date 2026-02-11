import mongoose, { Schema } from "mongoose";

const InvestmentApplicationSchema = new Schema(
  {
    userid: { type: String, default: "" }, // ✅ add this if you query by userid

    status: { type: String, default: "draft" },

    investorOne: { type: Schema.Types.Mixed, default: {} },
    investorTwo: { type: Schema.Types.Mixed, default: {} },

    accountHolders: { type: Schema.Types.Mixed, default: {} },

    lumpSum: {
      type: Schema.Types.Mixed,
      default: { selected: false, amount: 0 },
    },

    regularSavingsPlan: {
      type: Schema.Types.Mixed,
      default: { selected: false, amount: 0 },
    },

    rspEndCondition: { type: String, default: "" },

    contributionAmount: { type: Number, default: 0 },

    aspFrequency: { type: String, default: "" },

    paymentMethod: { type: String, default: "" },

    signatures: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    strict: false, // ✅ allows extra fields without errors
  },
);

export const InvestmentApplicationModel = mongoose.model(
  "InvestmentApplication",
  InvestmentApplicationSchema,
);

export const getPrepaydataByUserId = (userid: string) =>
  InvestmentApplicationModel.findOne({ userid });
