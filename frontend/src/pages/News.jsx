import Hero from "../components/common/Hero";
import NewsSection from "../components/pages/News/NewsSection";

function News() {
  return (
    <>
      <Hero title={"News"} subtitle={"News"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <NewsSection />
        <h1>Testing git</h1>
      </section>
    </>
  );
}

export default News;
