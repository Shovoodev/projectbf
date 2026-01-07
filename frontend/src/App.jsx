import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/layouts/Header/Header";
import Footer from "./components/layouts/Footer/Footer";
import { useUser } from "./components/hooks/useUser";
import { useEffect } from "react";

function App() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
      navigate(`/${user._id}/user`, { replace: true });
    }
  }, [user, pathname, navigate]);

  return (
    <section>
      <Header />
      <main className="mx-auto">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}

export default App;
