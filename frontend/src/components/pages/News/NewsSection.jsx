import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "./_components/NewsCard";

const BlogSection = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("newsData:", newsData, Array.isArray(newsData));

  useEffect(() => {
    window.scrollTo(0, 0);
    const getNews = async () => {
      try {
        const res = await fetch("http://localhost:4000/publish-all-blog-data");
        const data = await res.json();
        const filteredNews = Array.isArray(data)
          ? data.filter((item) => item?.category?.toLowerCase() === "btf news")
          : [];

        setNewsData(filteredNews);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-container">
        {/* Section Header with Button in Corner */}
        <div className="flex justify-center items-start md:items-center mb-16 flex-col md:flex-row gap-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Latest News & Insights
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Stay updated with our latest articles, guides, and company
              announcements.
            </p>
          </div>
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
            {newsData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No News posts yet. Create your first one!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData.map((item) => (
                  <NewsCard
                    key={item._id}
                    news={{
                      id: item._id,
                      title: item.title,
                      author: item.author,
                      content: item.content,
                      category: item.category,
                      excerpt: item.excerpt,
                      images: item.images,
                      date: item.createdAt || item.date,
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
