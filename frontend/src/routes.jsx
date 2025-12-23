import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Chapels from "./pages/Chapels";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import LiveMusic from "./pages/LiveMusic";
import MusicSection from "./pages/Music";
import News from "./pages/News";
import Resources from "./pages/Resources";
import ServiceArea from "./pages/Service-Area";
import Team from "./pages/Team";
import LandingPage from "./pages/Landing-Page";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/music",
        element: <MusicSection />,
      },
      {
        path: "/chepels",
        element: <Chapels />,
      },
      {
        path: "/live-music",
        element: <LiveMusic />,
      },
      {
        path: "/resources",
        element: <Resources />,
      },
      {
        path: "/service-area",
        element: <ServiceArea />,
      },
      {
        path: "/landing-page",
        element: <LandingPage />,
      },
    ],
  },
]);
