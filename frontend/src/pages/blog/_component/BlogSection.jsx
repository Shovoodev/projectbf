import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserFront } from "../../../utility/use-userFront";
import Card from "../../../components/common/Card";

const CORE = import.meta.env.VITE_API_URL;

const BlogSection = () => {
  const [error, setError] = useState(null);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { user } = useUserFront();

  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const getBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${CORE}/publish-all-blog-data?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        );

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Request failed (${res.status})`);
        }

        const data = await res.json();

        if (!isMounted) return;

        setBlogData(Array.isArray(data?.items) ? data.items : []);
        setTotalPages(Number(data?.meta?.totalPages) || 1);

        // scroll after data load (single place)
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setError(err?.message || "Something went wrong");
        setBlogData([]);
        setTotalPages(1);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getBlogs();

    return () => {
      isMounted = false;
    };
  }, [currentPage, ITEMS_PER_PAGE]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const pageNumbers = useMemo(() => {
    const maxVisible = 5;
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
  }, [currentPage, totalPages]);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        {/* Header */}
        <div className="flex justify-center items-start md:items-center mb-16 flex-col md:flex-row gap-4">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Latest Blog Posts
            </h2>
            <p className="text-gray-500 max-w-2xl md:ml-0">
              Stay updated with our latest articles, guides, and company announcements.
            </p>
          </div>

          {user && (
            <button
              onClick={() => navigate("/create-new-blog")}
              className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 whitespace-nowrap"
            >
              New blog
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto" />
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading blogs: {error}</p>
            <button
              onClick={() => setCurrentPage(1)}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        )}

        {/* Data */}
        {!loading && !error && (
          <>
            {blogData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No blog posts yet. Create your first one!</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogData.map((item) => (
                    <Card
                      key={item?._id || item?.id}
                      item={item}
                      getLink={(b) => `/blog/${b._id}`}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded border text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                        }`}
                    >
                      Prev
                    </button>

                    {pageNumbers[0] !== 1 && (
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

                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 rounded border text-sm ${page === currentPage
                            ? "bg-black text-white border-black"
                            : "hover:bg-gray-100"
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    {pageNumbers[pageNumbers.length - 1] !== totalPages && (
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
                      className={`px-4 py-2 rounded border text-sm ${currentPage === totalPages
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

export default BlogSection;
