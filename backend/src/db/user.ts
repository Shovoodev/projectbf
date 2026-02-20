import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    reference: { type: String },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    authentication: {
      password: { type: String, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
    role: {
      type: String,
      enum: ["admin", "office", "user"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);



export const userModel = mongoose.model("User", userSchema);
export const getUsers = () => userModel.find();
export const getsingleUserById = (userId: string) => userModel.findById(userId);
export const getAttendenceByUserId = (userId: string) =>
  userModel.findById(userId);
export const getUserBySessionToken = (sessionToken: string) =>
  userModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => userModel.findById(id);
export const createUser = (values: Record<string, any>) =>
  new userModel(values).save().then((user) => user.toObject());

export const getLatestUserByEmail = (email: string) => {
  const normalizedEmail = String(email).trim().toLowerCase();
  return userModel
    .findOne({ email: normalizedEmail })
    .sort({ createdAt: -1 });
};

export const getUsersByEmail = (email: string) => {
  const normalizedEmail = String(email).trim().toLowerCase();
  return userModel.find({ email: normalizedEmail }).sort({ createdAt: -1 });
};