import { Link, useParams } from "react-router-dom";
import Hero from "../../components/common/Hero";
import { newsData } from "../../data/newsData";

const NewsDetails = () => {
  const { id } = useParams();
  const articleId = parseInt(id, 10);
  const article = newsData.find((n) => n.id === articleId);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <p className="mb-6">
          The news article you're looking for doesn't exist.
        </p>
        <Link to="/news" className="text-blue-600 underline">
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <>
      <Hero title={article.title} subtitle={article.category} />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <div className="text-sm text-gray-500 flex items-center gap-4 mb-6">
          <span>By {article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.category}</span>
        </div>

        <article className="prose max-w-none text-justify">
          <p>{article.content}</p>
          <p>{article.excerpt}</p>
        </article>

        <div className="mt-8">
          <Link
            to="/news"
            className="inline-block bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200"
          >
            ← Back to News
          </Link>
        </div>
      </main>
    </>
  );
};

export default NewsDetails;



