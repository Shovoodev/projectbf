import React from "react";
import {
  FaArrowRight,
  FaCalendarDays,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");

    const months = [
      "jan", "feb", "mar", "apr", "may", "jun",
      "jul", "aug", "sep", "oct", "nov", "dec"
    ];

    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const cutExcerpt = (text) => {
    if (text.length <= 3) return text;
    return text.slice(3);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="h-56 overflow-hidden relative group">
        <img
          src={blog.images?.[0]}
          alt={blog.title}
          className="w-full h-full object-cover  font-bold transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay for hover effect (optional, adds polish) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-gray-600 transition-colors cursor-pointer">
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </h3>

        {/* Meta Data */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-1.5">
            <FaUser className="text-gray-400" />
            <span>By {blog.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaCalendarDays className="text-gray-400" />
            <span>{
              formatDate(blog.date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaFolderOpen className="text-gray-400" />
            <span>{blog.category}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 text-justify">
          {
            cutExcerpt(blog.excerpt)}
        </p>

        {/* Button */}
        <div className="mt-auto flex items-center">
          <Link
            to={`/blog/${blog.id}`}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center text-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
          >
            Read More <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
