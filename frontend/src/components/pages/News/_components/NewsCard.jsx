import React from "react";
import {
  FaArrowRight,
  FaCalendarDays,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  const id = news?._id || news?.id; // ✅ match NewsDetails route param

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Unknown date";

    const day = date.getDate().toString().padStart(2, "0");
    const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const stripTags = (html, maxLength = 120) => {
    const text = String(html || "").replace(/<[^>]*>/g, "").trim();
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const image =
    news?.images?.[0] ||
    news?.coverImage ||
    "https://via.placeholder.com/800x400?text=No+Image";

  const author = news?.author || "Anonymous";
  const category = news?.category || "News";
  const date = news?.createdAt || news?.date; // ✅ backend usually gives createdAt

  // If no id, don’t render broken links
  if (!id) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image */}
      <div className="h-56 overflow-hidden relative group">
        <img
          src={image}
          alt={news?.title || "News"}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-gray-600 transition-colors cursor-pointer">
          <Link to={`/news/${id}`}>{news?.title}</Link>
        </h3>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-1.5">
            <FaUser className="text-gray-400" />
            <span>By {author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaCalendarDays className="text-gray-400" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaFolderOpen className="text-gray-400" />
            <span>{category}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 text-justify">
          {stripTags(news?.excerpt || news?.content || "", 150)}
        </p>

        {/* Button */}
        <div className="mt-auto flex items-center">
          <Link
            to={`/news/${id}`}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center text-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
          >
            Read More <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
