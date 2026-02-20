import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../components/layouts/Header/Header";
import Footer from "../components/layouts/Footer/Footer";
import Intro_video from "../pages/Intro_video";

function MainLayout() {
  const location = useLocation();

  const [showIntro, setShowIntro] = useState(location.pathname === "/");

  // const noFooterRoutes = ["/landing-page", "/attending-cremation-landing"];

  // const hideFooter = noFooterRoutes.includes(location.pathname);

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

export default MainLayout;
