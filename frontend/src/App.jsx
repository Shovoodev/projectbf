import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import { useEffect } from "react";
import { useUserFront } from "./utility/use-userFront";
import Intro_video from "./pages/Intro_video";

function App() {
  const { user } = useUserFront();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const CORE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // 🔐 Define private routes
    const isPrivateRoute = pathname.startsWith("/user");

    // 🚫 Not logged in → block private routes
    if (!user?._id && isPrivateRoute) {
      navigate("/login", { replace: true });
      return;
    }

    // ✅ Logged in → block login page
    if (user?._id && pathname === "/login") {
      navigate(`/user`, { replace: true });
    }
  }, [user, pathname, navigate]);

  const location = useLocation();

  const isHomeRoute = location.pathname === "/";
  return (
    <section>
      {isHomeRoute ? (
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
