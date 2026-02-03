import mongoose from "mongoose";

/* -------------------- COMMON SUB-SCHEMAS -------------------- */

const AddressSchema = new mongoose.Schema(
  {
    unit: String,
    streetNo: String,
    streetName: String,
    suburb: String,
    state: String,
    postcode: String,
    country: { type: String, default: "AUSTRALIA" },
  },
  { _id: false }
);

const ContactSchema = new mongoose.Schema(
  {
    daytimeTelephone: String,
    mobile: String,
    daytimeAddress: String,
    email: String,
  },
  { _id: false }
);

const InvestorSchema = new mongoose.Schema(
  {
    investor: String,
    saturation: String,
    title: String,
    surname: String,
    givenNames: String,
    dob: Date,
    gender: String,

    residentialAddress: AddressSchema,
    mailingAddress: AddressSchema,

    contact: ContactSchema,
  },
  { _id: false }
);

const AccountHolderSchema = new mongoose.Schema(
  {
    title: String,
    surnameOrEntityName: String,
    givenNames: String,
  },
  { _id: false }
);

const SignatureSchema = new mongoose.Schema(
  {
    signature: String,
    signatureDate: Date,
  },
  { _id: false }
);

const InvestmentApplicationSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    // email: String,
    status: {
      type: String,
      enum: ["draft", "submitted"],
      default: "draft",
    },
    /* Investors */
    investorOne: InvestorSchema,
    investorTwo: InvestorSchema,

    /* Account Holders */
    accountHolders: {
      holderOne: AccountHolderSchema,
      holderTwo: AccountHolderSchema,

      addressabn: String,
      suburbabn: String,
      stateabn: String,
      postcodeabn: String,
      countryabn: { type: String, default: "AUSTRALIA" },

      institutionName: String,
      branch: String,
      accountName: String,
      bsbNumber: String,
      accountNumber: String,

      formType: {
        type: String,
        default: "KEYINVEST_DIRECT_DEBIT_REQUEST",
      },
      version: {
        type: String,
        default: "July 2025",
      },
      submittedAt: Date,
    },

    /* Contributions */
    lumpSum: {
      selected: { type: Boolean, default: false },
      amount: Number,
    },

    regularSavingsPlan: {
      selected: { type: Boolean, default: false },
      amount: Number,
    },

    rspEndCondition: String,

    contributionAmount: Number,
    aspFrequency: {
      type: String,
      enum: ["Weekly", "Fortnightly", "Monthly", "Quarterly"],
    },

    paymentMethod: {
      type: String,
      enum: ["Direct Debit", "BPAY", "Credit Card", "Bank Transfer"],
    },

    /* Signatures */
    signatures: {
      accountHolder1: SignatureSchema,
      accountHolder2: SignatureSchema,
    },
  },
  {
    timestamps: true,
  }
);

/* -------------------- EXPORT -------------------- */

export const InvestmentApplicationModel = mongoose.model(
  "InvestmentApplication",
  InvestmentApplicationSchema
);
