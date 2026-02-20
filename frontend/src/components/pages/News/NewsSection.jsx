import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserFront } from "../../../utility/use-userFront";
import Card from "../../common/Card";

const CORE = import.meta.env.VITE_API_URL;
const ITEMS_PER_PAGE = 12;

// (optional) if your API supports selecting fields, this saves payload size
const FIELDS =
  "title,excerpt,images,coverImage,author,category,createdAt,slug,status";

const NewsSection = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserFront();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ cache pages: { [pageNumber]: { items, totalPages } }
  const cacheRef = useRef(new Map());

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const load = async () => {
      // ✅ Serve from cache instantly
      const cached = cacheRef.current.get(currentPage);
      if (cached) {
        setNewsData(cached.items);
        setTotalPages(cached.totalPages);
        setLoading(false);
        setError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // ✅ build URL safely
        const url = new URL(`${CORE}/publish-btf-news`);
        url.searchParams.set("page", String(currentPage));
        url.searchParams.set("limit", String(ITEMS_PER_PAGE));
        // optional (backend can ignore if unsupported)
        url.searchParams.set("fields", FIELDS);

        const res = await fetch(url.toString(), { signal });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Request failed (${res.status})`);
        }

        const data = await res.json();

        const items = Array.isArray(data?.items) ? data.items : [];
        const pages = Number(data?.meta?.totalPages) || 1;

        // ✅ cache result
        cacheRef.current.set(currentPage, { items, totalPages: pages });

        setNewsData(items);
        setTotalPages(pages);

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        // ignore abort errors
        if (err?.name === "AbortError") return;

        console.error(err);
        setError(err?.message || "Something went wrong");
        setNewsData([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    load();

    // ✅ abort request if page changes/unmount
    return () => controller.abort();
  }, [currentPage]);

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
        <div className="flex justify-center items-start md:items-center mb-16 flex-col md:flex-row gap-4">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              BTF News
            </h2>
            <p className="text-gray-500 max-w-2xl md:ml-0">
              Company announcements and updates.
            </p>
          </div>

          {user && (
            <button
              onClick={() => navigate("/create-new-blog")}
              className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-all active:scale-95 whitespace-nowrap"
            >
              New post
            </button>
          )}
        </div>

        {/* ✅ Keep old data visible while loading next page */}
        {loading && newsData.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto" />
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading news: {error}</p>
            <button
              onClick={() => {
                cacheRef.current.delete(currentPage); // ✅ clear cache for this page
                setCurrentPage((p) => p); // trigger refetch
              }}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        )}

        {!error && (
          <>
            {newsData.length === 0 && !loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No news posts found.</p>
              </div>
            ) : (
              <>
                {/* Optional small loading hint while switching pages */}
                {loading && newsData.length > 0 && (
                  <div className="text-center -mt-6 mb-6 text-sm text-gray-500">
                    Loading page {currentPage}...
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newsData.map((item) => (
                    <Card
                      key={item?._id}
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
                      className={`px-4 py-2 rounded border text-sm ${currentPage === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-100"
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

export default NewsSection;
