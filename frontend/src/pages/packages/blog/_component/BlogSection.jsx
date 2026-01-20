import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { LogoPdf } from "../../../../images";
import PopupEnquirey from "../../_components/PopupEnquirey";
import { useNavigate } from "react-router-dom";

const BlogSection = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getBlogs = async () => {
      try {
        const res = await fetch("http://localhost:4000/publish-all-blog-data");
        const data = await res.json();
        setBlogData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);
  const openPopup = (popupType) => {
    setActivePopup(popupType);
  };

  const closePopup = () => {
    setActivePopup(null);
  };
  console.log({ blogData });

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        {/* Section Header with Button in Corner */}
        <div className="flex justify-between items-start md:items-center mb-16 flex-col md:flex-row gap-4">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-gray-500 max-w-2xl">
              Stay updated with our latest articles, guides, and company
              announcements.
            </p>
          </div>

          <button
            onClick={() => openPopup("createblog")}
            className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 whitespace-nowrap"
          >
            New blog
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading blogs: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        )}
        {!loading && !error && (
          <>
            {blogData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No blog posts yet. Create your first one!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogData.map((item) => (
                  <BlogCard
                    key={item._id} // Use _id from MongoDB or id
                    blog={{
                      id: item._id,
                      title: item.title,
                      author: item.author,
                      content: item.content,
                      category: item.category,
                      excerpt: item.excerpt,
                      image: item.image,
                      date: item.createdAt || item.date,
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <PopupEnquirey
        isOpen={activePopup === "createblog"}
        onClose={() => {
          closePopup();
        }}
        mode="createblog"
        title="Create Post"
        mainTitle="Create New Blog Post"
        description="Write and publish your new article"
      />
    </section>
  );
};

export default BlogSection;
