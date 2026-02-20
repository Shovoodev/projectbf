import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import introVideo from "../../assets/video/BTF Intro Video.mp4"; // desktop
import introVideoMobile from "../../assets/video/BTF intro mobile.mp4"; // mobile

function Intro_video() {
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Redirect function
  const goNextPage = () => {
    navigate("/attending-cremation-landing", { replace: true });
  };

  // Fallback redirect (in case video can't autoplay / slow network / blocked)
  useEffect(() => {
    const timer = setTimeout(() => {
      goNextPage();
    }, 15000); // 15 sec fallback

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <video
        src={isMobile ? introVideoMobile : introVideo}
        autoPlay
        muted
        playsInline
        onEnded={goNextPage}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default Intro_video;
