import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    excerpt: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

export const blogModel = mongoose.model("blogs", blogSchema);

export const getBlogs = () => blogModel.find();

export const getBlogById = (userId: string) => blogModel.findById(userId);
