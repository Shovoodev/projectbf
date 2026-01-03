import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Ash_Storage from "./pages/Ash_Storage";
import Chapels from "./pages/Chapels";
import Coffins from "./pages/Coffins";
import Contact from "./pages/Contact";
import Disclaimer from "./pages/Disclaimer";
import Expansion from "./pages/Expansion";
import Faq from "./pages/Faq";
import Home from "./pages/Home";
import LandingPage from "./pages/Landing-Page";
import LiveMusic from "./pages/LiveMusic";
import MusicSection from "./pages/Music";
import News from "./pages/News";
import NewsDetails from "./pages/News[id]/NewsDetails";
import Refund_Policy from "./pages/Refund_Policy";
import Resources from "./pages/Resources";
import ServiceArea from "./pages/Service-Area";
import Team from "./pages/Team";
import Testimonials from "./pages/Testimonials";
// from Toukirul vai
import AgreementForm from "./pages/Agreement";
import Pay_now from "./pages/Pay_now";
import Registrarion from "./pages/Registration";
import SignIn from "./pages/SignIn";
import AttendenceCrementionPage from "./pages/packages/AttendenceCrementionPage";
import AttendenceCrementionPageFinal from "./pages/packages/AttendenceCrementionPageFinal";
import DeceasedPersonPage from "./pages/packages/DeceasedPersonPage";
import KinDetailsPage from "./pages/packages/KinDetailsPage";
import Signature from "./pages/Signature";

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
        path: "/news/:id",
        element: <NewsDetails />,
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
      {
        path: "/agreement",
        element: <AgreementForm />,
      },
      {
        path: "/pay-now",
        element: <Pay_now />,
      },
      {
        path: "/signature",
        element: <Signature />,
      },
      // from Toukirul
      {
        path: "/:userid/packages/basic",
        element: <AttendenceCrementionPage />,
      },
      {
        path: "/:userid/kindetailpage",
        element: <KinDetailsPage />,
      },

      {
        path: "/:userid/deceasedpersondetails",
        element: <DeceasedPersonPage />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },

      {
        path: "/packages/standard/register",
        element: <Registrarion />,
      },
      {
        path: "/packages/premium/register",
        element: <Registrarion />,
      },
      {
        path: "/packages/basic/register",
        element: <Registrarion />,
      },
      {
        path: "/packages/attendencecremention",
        element: <AttendenceCrementionPageFinal />,
      },
    ],
  },
]);
