import multer from "multer";
import type { Request } from "express";
import type { StorageEngine } from "multer";
import { claudinaryConfig } from "../config/cloudinary";

/**
 * Minimal custom Cloudinary storage engine for Multer.
 * Removes dependency on `multer-storage-cloudinary`.
 */
type CloudinaryParams = Record<string, any>;
type ParamsFn = (req: Request, file: Express.Multer.File) => Promise<CloudinaryParams> | CloudinaryParams;

class CloudinaryMulterStorage implements StorageEngine {
  private cloudinary: any;
  private params: ParamsFn;

  constructor(opts: { cloudinary: any; params: ParamsFn }) {
    this.cloudinary = opts.cloudinary;
    this.params = opts.params;
  }

  _handleFile(req: Request, file: Express.Multer.File, cb: (error?: any, info?: any) => void) {
    Promise.resolve(this.params(req, file))
      .then((uploadOptions) => {
        const uploader = this.cloudinary?.uploader;
        if (!uploader?.upload_stream) {
          return cb(new Error("Cloudinary is not configured properly. Missing uploader.upload_stream."));
        }

        const stream = uploader.upload_stream(uploadOptions, (err: any, result: any) => {
          if (err) return cb(err);
          if (!result) return cb(new Error("Cloudinary upload failed with no result."));

          // Multer expects "info" object. Attach useful fields similar to cloudinary storage libs.
          cb(null, {
            path: result.secure_url || result.url,
            filename: result.public_id,
            size: result.bytes,
            cloudinary: result,
          });
        });

        file.stream.pipe(stream);
      })
      .catch((err) => cb(err));
  }

  _removeFile(_req: Request, file: any, cb: (error: Error | null) => void) {
    const publicId = file?.filename || file?.cloudinary?.public_id;
    if (!publicId) return cb(null);

    const uploader = this.cloudinary?.uploader;
    if (!uploader?.destroy) return cb(null);

    uploader.destroy(publicId, () => cb(null));
  }
}

/** Helper: same as your old getUploadedFile */
export const getUploadedFile = (req: Request, fieldName: string) => {
  const single = (req as any).file as Express.Multer.File | undefined;
  if (single) return single;

  const files = (req as any).files as
    | { [fieldname: string]: Express.Multer.File[] }
    | Express.Multer.File[]
    | undefined;

  if (!files) return undefined;

  if (Array.isArray(files)) return files[0];

  return files[fieldName]?.[0];
};

// -------------------- Main storage (photo/sign/pdf) --------------------

const storage = new CloudinaryMulterStorage({
  cloudinary: claudinaryConfig(),
  params: async (_req, file) => ({
    folder: file.fieldname === "photo" ? "kin/photo" : "kin/sign",
    format: file.mimetype === "application/pdf" ? "pdf" : undefined,
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  }),
});

export const upload = multer({ storage });

// -------------------- Blog storages --------------------

const blogStorage = new CloudinaryMulterStorage({
  cloudinary: claudinaryConfig(),
  params: async (req, _file) => {
    let folder = "blog";
    if (req.body.category) {
      folder = `blog/${String(req.body.category).toLowerCase().replace(/\s+/g, "-")}`;
    }

    return {
      folder,
      allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
      transformation: [
        { width: 1200, height: 630, crop: "limit" },
        { quality: "auto:good" },
        { fetch_format: "auto" },
      ],
      public_id: `blog-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
    };
  },
});

const blogContentStorage = new CloudinaryMulterStorage({
  cloudinary: claudinaryConfig(),
  params: async () => ({
    folder: "blog/content",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
    transformation: [
      { width: 800, crop: "limit" },
      { quality: "auto:good" },
      { fetch_format: "auto" },
    ],
    public_id: `content-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  }),
});

const featuredImageStorage = new CloudinaryMulterStorage({
  cloudinary: claudinaryConfig(),
  params: async () => ({
    folder: "blog/featured",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [
      { width: 1200, height: 628, crop: "fill", gravity: "auto" },
      { quality: "auto:best" },
      { fetch_format: "auto" },
    ],
    public_id: `featured-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  }),
});

// Export different upload middlewares
export const uploadBlogImages = multer({
  storage: blogStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 10,
  },
  fileFilter: (_req, file, cb) => {
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

// If you also need these two storages as middlewares later, you can export them similarly:
// export const uploadBlogContentImages = multer({ storage: blogContentStorage });
// export const uploadFeaturedImages = multer({ storage: featuredImageStorage });

// Fallback memory storage for large text fields
export const memoryStorage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldSize: 50 * 1024 * 1024,
  },
});
