import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserFront } from "../../../utility/use-userFront";
import Card from "../../common/Card";
const CORE = import.meta.env.VITE_API_URL;

const NewsSection = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserFront();

  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    const getBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${CORE}/publish-all-blog-data`);
        const data = await res.json();

        const filteredData = Array.isArray(data)
          ? data.filter((item) => item?.category?.toLowerCase() === "btf news")
          : [];

        setBlogData(filteredData);
        setCurrentPage(1); // ✅ reset page on new data
      } catch (error) {
        console.error(error);
        setError(error?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  const totalPages = Math.ceil(blogData.length / ITEMS_PER_PAGE);

  const currentBlogs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return blogData.slice(start, end);
  }, [blogData, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const maxVisible = 5; // show 5 page buttons
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      start = 1;
      end = 5;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 4;
      end = totalPages;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <section className="bg-white p-4 py-16 md:py-24">
      <div className="section-container">
        {/* Section Header with Button in Corner */}
        <div className="flex flex-col items-center justify-center mb-16 md:flex-row md:justify-center gap-4">
          <div className="text-center">
            <h2 className="text-4xl  md:text-5xl font-display font-bold text-gray-900 mb-4">
              Latest News Posts
            </h2>
            <p className="text-gray-500 ">
              Stay updated with our latest articles, guides, and company
              announcements.
            </p>
          </div>

          {user && (
            <button
              onClick={() => navigate("/create-new-blog")}
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
          )}
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
                  No news posts yet. Create your first one!
                </p>
              </div>
            ) : (
              <>
                {/* ✅ Blog Cards (only 12 per page) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentBlogs.map((item) => (
                    <Card item={item} getLink={(b) => `/news/${b._id}`} />
                  ))}
                </div>

                {/* ✅ Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded border text-sm ${
                        currentPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Prev
                    </button>

                    {getPageNumbers()[0] !== 1 && (
                      <>
                        <button
                          onClick={() => goToPage(1)}
                          className="px-4 py-2 rounded border text-sm hover:bg-gray-100"
                        >
                          1
                        </button>
                        <span className="px-2 text-gray-500">...</span>
                      </>
                    )}

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 rounded border text-sm ${
                          page === currentPage
                            ? "bg-black text-white border-black"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {getPageNumbers()[getPageNumbers().length - 1] !==
                      totalPages && (
                      <>
                        <span className="px-2 text-gray-500">...</span>
                        <button
                          onClick={() => goToPage(totalPages)}
                          className="px-4 py-2 rounded border text-sm hover:bg-gray-100"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded border text-sm ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
