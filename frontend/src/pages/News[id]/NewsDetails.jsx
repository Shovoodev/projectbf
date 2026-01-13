import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarAlt, FaSearch, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { newsData } from "../../data/newsData"; // Assuming your data is here

// --- COMPONENTS ---

// 1. Sidebar Component
const Sidebar = () => {
  // In a real app, you might fetch these lists from an API
  const recentPosts = newsData.slice(0, 5);
  const categories = [
    "BTF News",
    "Funeral Services",
    "Planning",
    "Grief Support",
  ];

  return (
    <aside className="space-y-12">
      {/* Search Widget */}
      <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
        <h3 className="font-display font-bold text-lg mb-4">Search</h3>
        <form className="relative">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search topics..."
            className="w-full p-4 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Recent Posts Widget */}
      <div>
        <h3 className="font-display font-bold text-lg mb-6 border-b border-gray-200 pb-2">
          Recent Posts
        </h3>
        <ul className="space-y-4">
          {recentPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/news/${post.id}`} className="group block">
                <h4 className="font-body text-gray-700 font-medium group-hover:text-black group-hover:underline transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <span className="text-xs text-gray-400 mt-1 block">
                  {post.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories Widget */}
      <div>
        <h3 className="font-display font-bold text-lg mb-6 border-b border-gray-200 pb-2">
          Categories
        </h3>
        <ul className="space-y-3">
          {categories.map((cat, index) => (
            <li key={index}>
              <Link
                to="#"
                className="flex justify-between items-center text-gray-600 hover:text-black transition-colors"
              >
                <span>{cat}</span>
                <span className="text-gray-300 text-sm">(0)</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Brand Widget */}
      <div className="text-center pt-8">
        <img
          src="https://blacktulipfunerals.com.au/wp-content/uploads/2025/10/BTF-Logo-Horizontal.png"
          alt="Black Tulip Funerals"
          className="w-48 mx-auto opacity-80"
        />
      </div>
    </aside>
  );
};

// 2. Comment Form Component
const CommentSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
    saveInfo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Comment submitted for approval.");
    setFormData({
      name: "",
      email: "",
      website: "",
      comment: "",
      saveInfo: false,
    });
  };

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
        Leave a Comment
      </h3>
      <p className="text-sm text-gray-500 mb-8">
        Your email address will not be published. Required fields are marked *
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="comment" className="sr-only">
            Comment*
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="6"
            required
            placeholder="Type here..."
            value={formData.comment}
            onChange={handleChange}
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-1 focus:ring-black focus:border-black outline-none bg-white text-gray-700"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input
            type="text"
            name="name"
            required
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none"
          />
          <input
            type="url"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="saveInfo"
            name="saveInfo"
            type="checkbox"
            checked={formData.saveInfo}
            onChange={handleChange}
            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
          />
          <label htmlFor="saveInfo" className="text-sm text-gray-600">
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>

        <button
          type="submit"
          className="bg-black text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition-all uppercase text-xs tracking-widest"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

// --- MAIN PAGE ---
const NewsDetails = () => {
  const { id } = useParams();
  const articleId = parseInt(id, 10);

  // Find article (or use Fetch API here)
  const article = newsData.find((n) => n.id === articleId);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <Link to="/news" className="text-black underline">
          Return to News
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Article Header (Hero Style) */}
      <header className="bg-gray-50 py-16 md:py-24 border-b border-gray-100">
        <div className="section-container max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-white border border-gray-200 rounded-full px-4 py-1 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              {article.category || "BTF News"}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 font-medium">
            <span className="flex items-center gap-2">
              <FaUser className="text-gray-400" /> {article.author}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400" /> {article.date}
            </span>
          </div>
        </div>
      </header>

      {/* 2. Main Content Layout */}
      <div className="section-container max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* --- LEFT COLUMN: Article Content (8 cols) --- */}
          <main className="lg:col-span-8">
            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden shadow-sm mb-10 aspect-video">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body (Prose for HTML styling) */}
            <article className="prose prose-lg prose-gray max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-800 text-justify">
              {/* If your data has HTML content, render it safely here */}
              {/* <div dangerouslySetInnerHTML={{ __html: article.content }} /> */}

              {/* Fallback for plain text data structure */}
              <p className="lead text-xl text-gray-600 mb-8">
                {article.excerpt}
              </p>
              <div className="whitespace-pre-line">{article.content}</div>
            </article>

            {/* Post Footer / Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Link
                  to="/news"
                  className="flex items-center gap-3 text-gray-500 hover:text-black transition-colors group"
                >
                  <span className="p-3 rounded-full bg-gray-50 group-hover:bg-gray-100">
                    <FaArrowLeft />
                  </span>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-gray-400">
                      Previous
                    </span>
                    <span className="font-bold text-sm">Back to News</span>
                  </div>
                </Link>
                {/* Logic for Next Post could go here */}
              </div>
            </div>

            {/* Comments */}
            <CommentSection />
          </main>

          {/* --- RIGHT COLUMN: Sidebar (4 cols) --- */}
          <div className="lg:col-span-4 pl-0 lg:pl-8">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;

// blog {
//   id:
//   title:
//   description:
//   comments: [
//     {
//       author: name,
//       comment: ""
//      }
//   ]
// }
