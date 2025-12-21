import Hero from "../components/common/Hero";
import MusicSection from "../components/pages/LiveMusic/MusicSection";

function Music() {
  return (
    <>
      <Hero title={"Live Music"} subtitle={"Live Music"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <MusicSection />
      </section>
    </>
  );
}

export default Music;
