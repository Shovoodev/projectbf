import { useMemo } from "react";
import {
  FaArrowRight,
  FaCalendarDays,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const stripTags = (html = "", maxLength = 150) => {
  const text = String(html)
    .replace(/<[^>]*>/g, "")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

/**
 * ReusableCard
 * Props:
 * - item: your blog/news object
 * - getLink: (item) => string  (defaults to `/blog/${item.id}`)
 * - titleKey, contentKey, dateKey, authorKey, categoryKey, imageKey (optional)
 * - showMeta (default true)
 * - showAuthor/showDate/showCategory (default true)
 * - excerptLength (default 150)
 * - buttonText (default "Read More")
 */
const Card = ({
  item,
  getLink = (x) => `/news/${x?.id}`,
  titleKey = "title",
  contentKey = "content",
  dateKey = "date",
  authorKey = "author",
  categoryKey = "category",
  imageKey = "images",

  showMeta = true,
  showAuthor = true,
  showDate = true,
  showCategory = true,

  excerptLength = 150,
  buttonText = "Read More",
  fallbackImage = "https://via.placeholder.com/600x400?text=No+Image",
}) => {
  const link = useMemo(() => getLink(item), [getLink, item]);

  const title = item?.[titleKey] ?? "";
  const content = item?.[contentKey] ?? "";
  const date = item?.[dateKey];
  const author = item?.[authorKey];
  const category = item?.[categoryKey];

  // supports images array like your current data
  const imageValue = item?.[imageKey];
  const imageSrc = Array.isArray(imageValue) ? imageValue?.[0] : imageValue;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      {/* Image */}
      <div className="h-56 overflow-hidden relative group">
        <img
          src={imageSrc || fallbackImage}
          alt={title}
          className="w-full h-full object-cover font-bold transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-display text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-gray-600 transition-colors cursor-pointer">
          <Link to={link}>{title}</Link>
        </h3>

        {/* Meta */}
        {showMeta && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mb-4 border-b border-gray-100 pb-4">
            {showAuthor && author && (
              <div className="flex items-center gap-1.5">
                <FaUser className="text-gray-400" />
                <span>By {author}</span>
              </div>
            )}

            {showDate && date && (
              <div className="flex items-center gap-1.5">
                <FaCalendarDays className="text-gray-400" />
                <span>{formatDate(date)}</span>
              </div>
            )}

            {showCategory && category && (
              <div className="flex items-center gap-1.5">
                <FaFolderOpen className="text-gray-400" />
                <span>{category}</span>
              </div>
            )}
          </div>
        )}

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1 text-justify">
          {stripTags(content, excerptLength)}
        </p>

        {/* Button */}
        <div className="mt-auto flex items-center">
          <Link
            to={link}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center text-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
          >
            {buttonText} <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
