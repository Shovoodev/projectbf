import mongoose from "mongoose";

const enquireSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, },
  source: { type: String, default: "social media" },
  question: { type: String },
  message: { type: String },
  phone: { type: Number },
});

export const enquireyModel = mongoose.model("Enquires", enquireSchema);
export const getEnquirey = () => enquireyModel.find();
export const geEnquireyByEmail = (email: string) =>
  enquireyModel.findOne({ email });
export const getsinglEnquireyById = (userId: string) =>
  enquireyModel.findById(userId);
export const getAttendenceBEnquireyId = (userId: string) =>
  enquireyModel.findById(userId);
export const geAdminBySessionToken = (sessionToken: string) =>
  enquireyModel.findOne({ "authentication.sessionToken": sessionToken });
export const geEnquireyById = (id: string) => enquireyModel.findById(id);
export const creatEnquirey = (values: Record<string, any>) =>
  new enquireyModel(values).save().then((user) => user.toObject());
