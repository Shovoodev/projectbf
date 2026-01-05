import mongoose from "mongoose";

const enquireSchema = new mongoose.Schema({
  enquireEmail: { type: String, required: true },
  name: { type: String, required: true },
  Source: { type: String, default: "social media" },
  question: { type: String, default: true },
  message: { type: String, default: true },
  phone: { type: Number, default: true },
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
