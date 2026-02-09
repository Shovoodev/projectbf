import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ blog, onSelect }) => {
    if (!blog) return null;

    const blogId = blog._id || blog.id;

    return (
        <Link
            to={`/blog/${blogId}`}
            onClick={() => onSelect?.()}   // ✅ clears when clicked
            className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition border border-gray-100"
        >
            <h3 className="text-lg font-semibold text-gray-900 hover:text-gray-600">
                {blog.title}
            </h3>
        </Link>
    );
};

export default SearchResult;
