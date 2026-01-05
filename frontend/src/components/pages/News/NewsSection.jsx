import {
  FaArrowRight,
  FaCalendarDays,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { newsData } from "../../../data/newsData";

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="h-56 overflow-hidden relative group">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay for hover effect (optional, adds polish) */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-gray-600 transition-colors cursor-pointer">
          <Link to={`/news/${news.id}`}>{news.title}</Link>
        </h3>

        {/* Meta Data */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-1.5">
            <FaUser className="text-gray-400" />
            <span>By {news.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaCalendarDays className="text-gray-400" />
            <span>{news.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaFolderOpen className="text-gray-400" />
            <span>{news.category}</span>
          </div>
        </div>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 text-justify">
          {news.excerpt}
        </p>

        {/* Button */}
        <div className="mt-auto flex items-center">
          <Link
            to={`/news/${news.id}`}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center text-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
          >
            Read More <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const NewsSection = () => {
  // using shared `newsData` imported from `src/data/newsData.js`

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        {/* Section Header (Optional, remove if not needed) */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Latest News & Insights
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Stay updated with our latest articles, guides, and company
            announcements.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
