import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

function App() {
  return <RouterProvider router={routes} />;
}

export default App;

// import { Outlet, useLocation } from "react-router-dom";
// import { useState } from "react";
// import Footer from "./components/layouts/Footer/Footer";
// import Header from "./components/layouts/Header/Header";
// import Intro_video from "./pages/Intro_video";

// function App() {
//   const location = useLocation();

//   const [showIntro, setShowIntro] = useState(
//     location.pathname === "/"
//   );

//   const noFooterRoutes = [
//     "/landing-page",
//     "/attending-cremation-landing",
//   ];

//   const hideFooter = noFooterRoutes.includes(location.pathname);

//   return (
//     <section>
//       {showIntro ? (
//         <Intro_video />
//       ) : (
//         <>
//           <Header />
//           <main className="mx-auto">
//             <Outlet />
//           </main>

//           {!hideFooter && <Footer />}
//         </>
//       )}
//     </section>
//   );
// }

// export default App;
