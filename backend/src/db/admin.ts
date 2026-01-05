import mongoose from "mongoose";

const AdminsSchema = new mongoose.Schema({
  adminEmail: { type: String, required: true },
  permission: { type: Boolean, default: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const adminsModel = mongoose.model("Admins", AdminsSchema);
export const getAdmin = () => adminsModel.find();
export const geAdminByEmail = (email: string) => adminsModel.findOne({ email });
export const getsinglAdminById = (userId: string) =>
  adminsModel.findById(userId);
export const getAttendenceBAdminId = (userId: string) =>
  adminsModel.findById(userId);
export const geAdminBySessionToken = (sessionToken: string) =>
  adminsModel.findOne({ "authentication.sessionToken": sessionToken });
export const geAdminById = (id: string) => adminsModel.findById(id);
export const creatAdmin = (values: Record<string, any>) =>
  new adminsModel(values).save().then((user) => user.toObject());
