import { useEffect, useState } from "react";
import introVideo from "../../assets/video/BTF Intro Video.mp4"; // This is for desktop
import introVideoMobile from "../../assets/video/BTF intro mobile.mp4"; // This is for mobile

import logo from "../../assets/video/Logo-Number.png";

function Intro_video() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {!videoEnded ? (
        <video
          src={isMobile ? introVideoMobile : introVideo}
          autoPlay
          muted
          playsInline
          onEnded={() => setVideoEnded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div className="w-full h-full bg-black flex items-center justify-center">
          <a href="/home" className="flex items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              className="cursor-pointer max-w-[300px] md:max-w-lg"
            />
          </a>
        </div>
      )}
    </div>
  );
}

export default Intro_video;
