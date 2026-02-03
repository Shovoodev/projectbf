import express from "express";
import { upload, uploadBlogImages } from "../middlewear/upload";
import {
  createBlog,
  deleteBlog,
  getallBlogs,
  getBlog,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogcontroller";
import { isAuthenticated } from "../middlewear";

export default (router: express.Router) => {
  router.post(
    "/create-btf-new-blog",
    uploadBlogImages.array("images", 10),
    createBlog
  );
  router.get("/publish-all-blog-data", getallBlogs);
  router.get("/single-blog-data/:id", getSingleBlog);
  router.get("/publish-blog/:id", getallBlogs);
  router.put("/:id", upload.single("image"), updateBlog);
  router.delete("/:id", deleteBlog);
};
