import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { claudinaryConfig } from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: claudinaryConfig(),
  params: {
    folder: "kin-details",
    allowed_formats: ["jpg", "png", "jpeg"],
  } as any,
});
export const upload = multer({
  storage,
});
