import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./components/layouts/Footer/Footer";
import Header from "./components/layouts/Header/Header";
import Intro_video from "./pages/Intro_video";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showIntro, setShowIntro] = useState(
    location.pathname === "/"
  );

  useEffect(() => {
    if (location.pathname === "/") {
      const timer = setTimeout(() => {
        setShowIntro(false);
        navigate("/home");
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, navigate]);

  return (
    <section>
      {showIntro ? (
        <Intro_video />
      ) : (
        <>
          <Header />
          <main className="mx-auto">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </section>
  );
}

export default App;
