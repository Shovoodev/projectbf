import express from "express";
import { upload, uploadBlogImages } from "../middlewear/upload";
import {
  createBlog,
  deleteBlog,
  getallBlogs,
  getBlog,
  getSingleBlog,
  searchBlogs,
  updateBlog,
} from "../controllers/blogcontroller";
import { isAuthenticated, isAuthenticatedAdmin } from "../middlewear";

export default (router: express.Router) => {
  router.post(
    "/create-btf-new-blog",
    isAuthenticatedAdmin,
    uploadBlogImages.array("images", 10),
    createBlog,
  );
  router.get("/publish-all-blog-data", getallBlogs);
  router.get("/search-blogs", searchBlogs);
  router.get("/single-blog-data/:id", getSingleBlog);
  router.get("/publish-blog/:id", getallBlogs);
  router.put(
    "/update-blog/:id",
    upload.single("image"),
    isAuthenticatedAdmin,
    updateBlog,
  );
  router.delete("/delete-blog/:id", isAuthenticatedAdmin, deleteBlog);
};
