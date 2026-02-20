import express from "express";

import fs from "fs";
import { blogModel, getBlogById, getBlogs } from "../db/blog";
import { AuthenticatedRequest } from "../lib/types";
import striptags from "striptags";
// CREATE BLOG

export const createBlog = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { title, content, category, excerpt, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    // Uploaded images (multer)
    const images =
      req.files && Array.isArray(req.files)
        ? req.files.map((file: any) => file.path)
        : [];

    // Generate excerpt from content if not provided
    let generatedExcerpt = excerpt;
    if (!generatedExcerpt) {
      const plainText = striptags(content);
      generatedExcerpt = plainText.slice(0, 150) + "...";
    }

    const blog = await blogModel.create({
      title,
      content,
      author: author || "Anonymous",
      category: category || "Uncategorized",
      excerpt: generatedExcerpt,
      images,
    });

    res.status(201).json(blog);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getallBlogs = async (req: express.Request, res: express.Response) => {
  try {
    const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
    const limit = Math.min(parseInt(String(req.query.limit ?? "12"), 10) || 12, 50);
    const skip = (page - 1) * limit;

    const filter = { category: { $not: /btf news/i } };

    const query = getBlogs().find(filter);

    const [items, total] = await Promise.all([
      query.sort({ createdAt: -1 }).skip(skip).limit(limit),
      getBlogs().countDocuments(filter),
    ]);

    res.json({
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasPrev: page > 1,
        hasNext: page * limit < total,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || "Failed to load blogs" });
  }
};



export const getBtfNews = async (req: express.Request, res: express.Response) => {
  try {
    const page = Math.max(parseInt(String(req.query.page ?? "1"), 10) || 1, 1);
    const limit = Math.min(parseInt(String(req.query.limit ?? "12"), 10) || 12, 50);
    const skip = (page - 1) * limit;

    // ONLY btf news (case-insensitive exact match)
    const filter = { category: { $regex: /^btf news$/i } };

    const [items, total] = await Promise.all([
      blogModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      blogModel.countDocuments(filter),
    ]);

    res.json({
      items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasPrev: page > 1,
        hasNext: page * limit < total,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err?.message || "Failed to load news" });
  }
};

// GET SINGLE BLOG
export const getBlog = async (req: express.Request, res: express.Response) => {
  const blog = await blogModel.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
};

// UPDATE BLOG
export const updateBlog = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Existing images from DB
    const existingImages = blog.images || [];

    // New uploaded images
    const uploadedImages =
      req.files && Array.isArray(req.files)
        ? req.files.map((file: any) => file.path)
        : [];

    // Images to remove (sent from frontend)
    const imagesToRemove = req.body.removeImages
      ? JSON.parse(req.body.removeImages)
      : [];

    // Delete removed images from filesystem
    imagesToRemove.forEach((imgPath: string) => {
      if (existingImages.includes(imgPath)) {
        try {
          fs.unlinkSync(imgPath);
        } catch (err) {
          console.error("Failed to delete image:", imgPath);
        }
      }
    });

    // Keep remaining images
    const updatedImages = existingImages.filter(
      (img: string) => !imagesToRemove.includes(img),
    );

    // Add newly uploaded images
    blog.images = [...updatedImages, ...uploadedImages];

    // Update other fields
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;
    // blog.excerpt = req.body.excerpt || blog.excerpt;

    await blog.save();

    res.json(blog);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE BLOG
export const deleteBlog = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // ✅ Delete all images
    if (blog.images && blog.images.length > 0) {
      blog.images.forEach((imgPath: string) => {
        try {
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
          }
        } catch (err) {
          console.error("Failed to delete image:", imgPath);
        }
      });
    }

    await blog.deleteOne();

    res.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
// search blogs by title or content
export const searchBlogs = async (
  req: express.Request,
  res: express.Response,
) => {
  const search = req.query.search || "";

  const blogs = await getBlogs().find({
    title: { $regex: search, $options: "i" },
  });

  res.json(blogs);
};
