import { useState } from "react";
import introVideo from "../../assets/video/BTF Intro Video.mp4";
import logo from "../../assets/video/Logo-Number.png";

function Intro_video() {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {!videoEnded ? (
        <video
          src={introVideo}
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
            <img src={logo} alt="Logo" className="cursor-pointer max-w-lg" />
          </a>
        </div>
      )}
    </div>
  );
}

export default Intro_video;
