import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  role: {
    type: String,
    enum: ["admin", "office", "user"],
    default: "user",
    required: true,
  },
});

export const userModel = mongoose.model("User", userSchema);
export const getUsers = () => userModel.find();
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getsingleUserById = (userId: string) => userModel.findById(userId);
export const getAttendenceByUserId = (userId: string) =>
  userModel.findById(userId);
export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());
