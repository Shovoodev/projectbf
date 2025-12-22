const SpotifyCard = ({ src }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full h-[380px] rounded-[12px] overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-black">
        <iframe
          src={src}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Embed"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

const MusicSection = () => {
  const spotifyUrls = [
    "https://open.spotify.com/embed/playlist/2ZX0AewTS0VO9v9kiGWb5u",
    "https://open.spotify.com/embed/playlist/39pNGLbbLphyCOxIsLu8G0",
    "https://open.spotify.com/embed/playlist/4HinbchdpiZO5bIC4tcwiy",
    "https://open.spotify.com/embed/playlist/3zEbzmB8eINPW1iR4AB9Hi",
    "https://open.spotify.com/embed/playlist/4xXUmkPYA7jPITBnlMDxXf",
    "https://open.spotify.com/embed/playlist/0IDZnVF0vr8vAduUgjsSAz",
    "https://open.spotify.com/embed/playlist/3HrOqBFN257w9BxCezDXMc",
    "https://open.spotify.com/embed/playlist/3c7L1TzYfztAgcByK5zVgd",
    "https://open.spotify.com/embed/playlist/2zU2OcORFqLFU6Mb9EvjR4",
    "https://open.spotify.com/embed/playlist/2O8Xgbag1cPGaChDOQc7Ao",
    "https://open.spotify.com/embed/playlist/13iRGzCXFsifduNXNtSNqL",
    "https://open.spotify.com/embed/playlist/5hYFkGPm4gmF00JRFEkb08",
    "https://open.spotify.com/embed/playlist/0Zl3R9lwHPh2LCrdftk3Lz",
    "https://open.spotify.com/embed/playlist/6DjVekN4zA3KnlPkCDM1GT",
    "https://open.spotify.com/embed/playlist/2bQLdLrJGS8W4pXA3Hf360",
    "https://open.spotify.com/embed/playlist/4J4Rk3OphhhlqtAk8gT2b4",
  ];

  return (
    <section className="bg-white py-16 md:py-24 ">
      <div className="section-container">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 ">
          {spotifyUrls.map((url, index) => (
            <SpotifyCard key={index} src={url} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
