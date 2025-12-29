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
import Faq from "./pages/Faq";
import Testimonials from "./pages/Testimonials";
import Refund_Policy from "./pages/Refund_Policy";
import Coffins from "./pages/Coffins";
import Disclaimer from "./pages/Disclaimer";
import Ash_Storage from "./pages/Ash_Storage";
import Expansion from "./pages/Expansion";

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
        path: "/coffins",
        element: <Coffins />,
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
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
      {
        path: "/refund-policy",
        element: <Refund_Policy />,
      },
      {
        path: "/disclaimer",
        element: <Disclaimer />,
      },
      {
        path: "/ash-storage",
        element: <Ash_Storage />,
      },
      {
        path: "/expansion",
        element: <Expansion />,
      },
    ],
  },
]);
