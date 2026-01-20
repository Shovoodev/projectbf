import express from "express";

import fs from "fs";
import { blogModel, getBlogById, getBlogs } from "../db/blog";
import { AuthenticatedRequest } from "../lib/types";

// CREATE BLOG
export const createBlog = async (
  // req: AuthenticatedRequest,
  req: express.Request,
  res: express.Response,
) => {
  try {
    // const response = req.identity;
    // if (!response) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    const { title, content, category, excerpt, image, author } = req.body;

    const blog = await blogModel.create({
      title,
      content,
      author: author || "Anonymous", // Use provided author or default
      category: category || "Uncategorized",
      excerpt: excerpt || "",
      image: image || null, // Accept image URL from frontend
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getallBlogs = async (
  req: express.Request,
  res: express.Response,
) => {
  const blogs = await getBlogs().sort({ createdAt: -1 });
  res.json(blogs);
};
export const getSingleBlog = async (
  req: express.Request,
  res: express.Response,
) => {
  const { _id } = req.body;
  const blogs = await getBlogById(_id);
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
  res: express.Response,
) => {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Not found" });

    if (req.file && blog.image) {
      fs.unlinkSync(blog.image);
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.image = req.file ? req.file.path : blog.image;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE BLOG
export const deleteBlog = async (
  req: express.Request,
  res: express.Response,
) => {
  const blog = await blogModel.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Not found" });

  if (blog.image) fs.unlinkSync(blog.image);
  await blog.deleteOne();

  res.json({ message: "Blog deleted" });
};
