import Hero from "../components/common/Hero";
import MediaGallery from "../components/pages/LiveMusic/MediaGallery";
import MusicianProfile from "../components/pages/LiveMusic/MusicianProfile";
import ServicePackages from "../components/pages/LiveMusic/ServicePackages";
import SongLists from "../components/pages/LiveMusic/SongLists";

function LiveMusic() {
  return (
    <>
      <Hero title={"Live Music"} subtitle={"Live Music"} />
      <section className="max-w-[1360px] mx-auto px-2.5 sm:px-4 lg:px-8 py-12 space-y-16">
        <ServicePackages />
        <SongLists />
        <MusicianProfile />

        <MediaGallery />
      </section>
    </>
  );
}

export default LiveMusic;
