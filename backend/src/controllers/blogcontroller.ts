import express from "express";

import fs from "fs";
import { blogModel, getBlogById, getBlogs } from "../db/blog";
import { AuthenticatedRequest } from "../lib/types";

// CREATE BLOG

export const createBlog = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, content, category, excerpt, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title, content, and excerpt are required",
      });
    }
    // Uploaded images (multer)
    const images =
      req.files && Array.isArray(req.files)
        ? req.files.map((file: any) => file.path)
        : [];

    const blog = await blogModel.create({
      title,
      content,
      author: author || "Anonymous",
      category: category || "Uncategorized",
      excerpt: excerpt || "",
      images, // ✅ MULTIPLE IMAGES
    });

    res.status(201).json(blog);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getallBlogs = async (
  req: express.Request,
  res: express.Response
) => {
  const blogs = await getBlogs().sort({ createdAt: -1 });
  res.json(blogs);
};
export const getSingleBlog = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const blogs = await getBlogById(id);

  res.json(blogs);
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
  res: express.Response
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
      (img: string) => !imagesToRemove.includes(img)
    );

    // Add newly uploaded images
    blog.images = [...updatedImages, ...uploadedImages];

    // Update other fields
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;
    blog.excerpt = req.body.excerpt || blog.excerpt;

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
  res: express.Response
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
