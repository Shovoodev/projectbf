import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarAlt, FaSearch, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const CommentSection = () => {
  // ... (keep your existing CommentSection code)
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [blogData, setBlogData] = useState([]);

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

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:4000/single-blog-data/${id}`);

        if (!res.ok) {
          throw new Error(
            `Failed to fetch blog: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        // Transform API data to match component expectations
        const transformedData = {
          ...data,
          // Use the first image from images array as main image, or placeholder
          image:
            data.images && data.images.length > 0
              ? data.images[0]
              : "https://via.placeholder.com/800x400?text=No+Image",
          // Format the createdAt date
          date: data.createdAt ? formatDate(data.createdAt) : "Unknown date",
          // Ensure author has a default value
          author: data.author || "Anonymous",
          // Ensure category has a default value
          category: data.category || "Uncategorized",
          // Ensure excerpt exists
          excerpt: data.excerpt || data.content?.substring(0, 150) + "...",
        };

        setArticle(transformedData);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError(error.message);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <p className="text-gray-600 mb-6">
          {error || "The requested blog post could not be found."}
        </p>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-all"
        >
          <FaArrowLeft /> Return to blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 2. Main Content Layout */}

      <div className="section-container max-w-7xl mx-auto px-6 py-16">
        <div>
          {article.title && (
            <div>
              <p className="text-lg text-gray-700 italic">{article.title}</p>
            </div>
          )}
          {/* Blog Stats */}
          <div className="bg-white  border-gray-200 rounded-xl mb-8">
            <ul className="space-y-3 flex">
              <li className="flex justify-between py-2 border-gray-100">
                <span className="font-medium">By {article.author} /</span>
              </li>
              <li className="flex justify-between py-2  border-gray-100">
                <span className="font-medium">{article.date}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* --- LEFT COLUMN: Article Content (8 cols) --- */}
          <main className="lg:col-span-8">
            {/* Featured Image */}
            {article.image && (
              <div className="rounded-2xl overflow-hidden shadow-sm mb-10">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x400?text=Image+Not+Found";
                  }}
                />
              </div>
            )}

            {/* Excerpt */}
            {article.excerpt && (
              <div className="mb-8 p-6">
                <p className="text-lg text-gray-700 italic">
                  {article.excerpt}
                </p>
              </div>
            )}

            {/* Content Body - Render HTML content safely */}
            <article
              className="prose prose-lg prose-gray max-w-none 
                            prose-headings:font-display prose-headings:font-bold 
                            prose-a:text-blue-600 hover:prose-a:text-blue-800 
                            prose-img:rounded-lg prose-img:shadow-md
                            prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50
                            prose-blockquote:py-2 prose-blockquote:px-4"
            >
              {/* Render HTML content if it exists */}
              {article.content &&
              typeof article.content === "string" &&
              article.content.includes("<") ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                /* Fallback for plain text */
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {article.content}
                </div>
              )}
            </article>

            {/* Additional Images Gallery */}
            {article.images && article.images.length > 1 && (
              <div className="mt-12 pt-10 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-6">More Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {article.images.slice(1).map((img, index) => (
                    <div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-sm"
                    >
                      <img
                        src={img}
                        alt={`${article.title} - Image ${index + 2}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=Image";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Post Footer / Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link
                  to="/blog"
                  className="flex items-center gap-3 text-gray-500 hover:text-black transition-colors group"
                >
                  <span className="p-3 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                    <FaArrowLeft />
                  </span>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-400">
                      Back to
                    </span>
                    <span className="font-bold text-sm">All Blogs</span>
                  </div>
                </Link>

                {/* Share buttons can be added here */}
                <div className="flex gap-3">
                  <button className="text-gray-500 hover:text-blue-600 transition-colors">
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <CommentSection />
          </main>

          {/* --- RIGHT COLUMN: Sidebar (4 cols) --- */}
          <aside className="lg:col-span-4 lg:pl-8">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-3">
              <h3 className="font-bold text-lg mb-4">Search Blogs</h3>
              <form className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
            {/* Author Bio Card */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUser className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{article.author}</h3>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {article.author === "Anonymous"
                  ? "This post was written by an anonymous contributor."
                  : `Writer and contributor at Black Tulip Funerals.`}
              </p>
            </div>

            {/* resent blogs */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
              <h1 className="font-bold text-xl">Recent Posts</h1>
              <ul className="space-y-3">
                {blogData.map((item) => {
                  return (
                    <li className="flex justify-between text-lg text-blue-500 py-2 border-b border-gray-100">
                      <span className="font-medium">{item.title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
