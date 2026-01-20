import express from "express";
import { upload } from "../middlewear/upload";
import {
  createBlog,
  deleteBlog,
  getallBlogs,
  getBlog,
  updateBlog,
} from "../controllers/blogcontroller";
import { isAuthenticated } from "../middlewear";

export default (router: express.Router) => {
  router.post("/create-btf-new-blog", createBlog);
  router.get("/publish-all-blog-data", getallBlogs);
  router.get("/publish-blog/:id", getallBlogs);
  router.put("/:id", upload.single("image"), updateBlog);
  router.delete("/:id", deleteBlog);
};
