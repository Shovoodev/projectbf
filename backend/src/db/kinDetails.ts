import mongoose from "mongoose";

const kinDetailsSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    salutation: {
      type: String,
      required: true,
    },
    givenName: { type: String, required: true },
    surname: { type: String, required: true },
    currentAddress: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    relation: { type: String, required: true },
    // photo: {
    //   public_id: String,
    //   url: String,
    // },
    // sign: {
    //   public_id: String,
    //   url: String,
    // },
    photo: { type: String },
    sign: { type: String },
  },
  { timestamps: true }
);

export const KinDetailsModel = mongoose.model("KinDetails", kinDetailsSchema);

export const createKinDetail = (values: Record<string, any>) =>
  new KinDetailsModel(values).save().then((user) => user.toObject());

export const getKinByUserId = (userId: string) =>
  KinDetailsModel.findOne({ userid: userId });
export const updateKinByUserId = (id: string, values: Record<string, any>) =>
  KinDetailsModel.findByIdAndUpdate(id, values);
