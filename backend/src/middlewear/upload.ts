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

// middleware/upload.js

// Configuration for blog images
const blogStorage = new CloudinaryStorage({
  cloudinary: claudinaryConfig(),
  params: async (req, file) => {
    // Determine folder based on file type or purpose
    let folder = "blog";

    // You can customize folder based on request
    if (req.body.category) {
      folder = `blog/${req.body.category.toLowerCase().replace(/\s+/g, "-")}`;
    }

    return {
      folder: folder,
      allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
      transformation: [
        { width: 1200, height: 630, crop: "limit" }, // Optimized for blog display
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
      // Add public_id with timestamp for uniqueness
      public_id: `blog-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    };
  },
});

// Configuration for blog content images (editor uploads)
const blogContentStorage = new CloudinaryStorage({
  cloudinary: claudinaryConfig(),
  params: async (req, file) => {
    return {
      folder: "blog/content",
      allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
      transformation: [
        { width: 800, crop: "limit" }, // Limit width for content images
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
      public_id: `content-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    };
  },
});

// Configuration for blog featured images
const featuredImageStorage = new CloudinaryStorage({
  cloudinary: claudinaryConfig(),
  params: async (req, file) => {
    return {
      folder: "blog/featured",
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
      transformation: [
        { width: 1200, height: 628, crop: "fill", gravity: "auto" }, // Social media optimized
        { quality: "auto:best" },
        { fetch_format: "auto" },
      ],
      public_id: `featured-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    };
  },
});

// Export different upload middlewares
export const uploadBlogImages = multer({
  storage: blogStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10, // Max 10 images per upload
  },
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Only image files (JPEG, PNG, GIF, WebP) are allowed"
        )
      );
    }
  },
});

export const uploadFeaturedImage = multer({
  storage: featuredImageStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB for featured images
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Only image files (JPEG, PNG, GIF, WebP) are allowed"
        )
      );
    }
  },
});

export const uploadContentImage = multer({
  storage: blogContentStorage,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB for content images
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Only image files (JPEG, PNG, GIF, WebP) are allowed"
        )
      );
    }
  },
});

// Fallback memory storage for large text fields
export const memoryStorage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 50 * 1024 * 1024, // 50MB for text fields
  },
});
