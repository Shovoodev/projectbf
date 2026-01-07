import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { claudinaryConfig } from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: claudinaryConfig(),
  params: async (req, file) => ({
    folder: file.fieldname === "photo" ? "kin/photo" : "kin/sign",
    format: file.mimetype === "application/pdf" ? "pdf" : undefined,
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  }),
});

export const upload = multer({
  storage,
});
