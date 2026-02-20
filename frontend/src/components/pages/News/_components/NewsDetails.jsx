import { useEffect, useState } from "react";
import { FaArrowLeft, FaSearch, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const CORE = import.meta.env.VITE_API_URL;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const stripHtml = (html) => {
  const temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || "";
};

const NewsDetails = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);

  // ✅ only titles list
  const [relatedTitles, setRelatedTitles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ---------------- FETCH RELATED TITLES (MAX 12) ---------------- */
  useEffect(() => {
    const getRelatedTitles = async () => {
      try {
        // ✅ preferred: ask backend for only title + max 12
        const res = await fetch(
          `${CORE}/publish-all-blog-data?limit=12&fields=title`
        );

        const data = await res.json();

        // ✅ fallback if backend ignores query params:
        // make sure we only keep _id + title and only 12 items
        const normalized = Array.isArray(data) ? data : data?.data || [];

        const onlyTitle = normalized
          .map((x) => ({ _id: x._id, title: x.title }))
          .slice(0, 12);

        setRelatedTitles(onlyTitle);
      } catch (err) {
        console.error(err);
      }
    };

    getRelatedTitles();
  }, []);

  /* ---------------- FETCH SINGLE BLOG ---------------- */
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${CORE}/single-blog-data/${id}`);
        if (!res.ok) throw new Error("Failed to fetch article");

        const data = await res.json();
        const plainText = stripHtml(data.content || "");

        const transformed = {
          ...data,
          image:
            data.images?.[0] ||
            "https://via.placeholder.com/800x400?text=No+Image",
          date: data.createdAt ? formatDate(data.createdAt) : "Unknown date",
          author: data.author || "Anonymous",
          category: data.category || "News",
          excerpt:
            data.excerpt ||
            plainText.substring(0, 150).split(" ").slice(0, -1).join(" ") +
            "...",
        };

        setArticle(transformed);
      } catch (err) {
        setError(err.message);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  /* ---------------- STATES ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <Link to="/news" className="text-blue-600 mt-4 inline-block">
          ← Back to News
        </Link>
      </div>
    );
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-white min-h-screen">
      <div className="section-container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ================= LEFT CONTENT ================= */}
          <main className="lg:col-span-8">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

            <div className="flex gap-4 text-gray-500 mb-6">
              <span>By {article.author}</span>
              <span>{article.date}</span>
            </div>

            <img
              src={article.image}
              alt={article.title}
              className="rounded-xl mb-10 w-full"
            />

            <article className="prose max-w-none">
              {article.content?.includes("<") ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <div className="whitespace-pre-line">{article.content}</div>
              )}
            </article>

            <div className="mt-10">
              <Link
                to="/news"
                className="flex items-center gap-2 text-gray-500 hover:text-black"
              >
                <FaArrowLeft /> Back to News
              </Link>
            </div>
          </main>

          {/* ================= SIDEBAR ================= */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="font-bold mb-4">Search News</h3>
              <div className="relative">
                <input
                  className="w-full border rounded-lg p-3 pr-10"
                  placeholder="Search..."
                />
                <FaSearch className="absolute right-3 top-4 text-gray-400" />
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <FaUser />
                <div>
                  <h4 className="font-semibold">{article.author}</h4>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
            </div>

            {/* ✅ Related titles (MAX 12, title only) */}
            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-bold mb-4">Related News</h3>

              <ul className="space-y-3">
                {relatedTitles
                  .filter((n) => n._id !== id)
                  .slice(0, 12)
                  .map((item) => (
                    <li key={item._id}>
                      <Link
                        to={`/news/${item._id}`}
                        className="hover:text-blue-600"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
