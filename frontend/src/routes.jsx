import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Ash_Storage from "./pages/Ash_Storage";
import Btf from "./pages/Btf";
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
import BlankLayout from "./BlankLayout";
import AgreementForm from "./pages/Agreement";

// import Pay_now from "./pages/Pay_now";
import AttendenceCrementionPage from "./pages/packages/AttendenceCrementionPage";
import Registrarion from "./pages/Registration";
import LoginScreen from "./pages/SignIn";
// import PaynowPage from "./pages/packages/PaynowPage";

import NoServiceCrementionPage from "./pages/packages/NoServiceCrementionPage";
// import PaynowPage from "./pages/packages/PaynowPage";
import ViewingAndCrementionPage from "./pages/packages/ViewingAndCremention";
import PrePayindex from "./pages/prepay";
import Signature from "./pages/Signature";
// import BlankLayout from "./BlankLayout";
import AgreementFormPage from "./pages/packages/Agreement";
import Packages from "./pages/Packages";

import Registration from "./pages/Registration";
import UserPage from "./pages/dashboard/UserPage";
import StaticInvoicePDF from "./pages/packages/_components/InvoicePdf";
import InvoicePage from "./pages/pay/InvoicePage";
import BlogPage from "./pages/packages/blog/BlogPage";
import BlogDetails from "./pages/packages/blog/_component/BlogDetails";
import CreateBlog from "./pages/packages/blog/_component/CreateBlog";
export const routes = createBrowserRouter([
  {
    path: "/",

    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        isPrivate: false,
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
        path: "/packages",
        element: <Packages />,
      },
      {
        path: "/agreement",
        element: <AgreementForm />,
      },
      {
        path: "/about-btf",
        element: <Btf />,
      },
      {
        path: "/signature",
        element: <Signature />,
      },
      // from Toukirul
      {
        path: "/packages/attending-service-cremation",
        element: <AttendenceCrementionPage />,
      },
      {
        path: "/packages/no-service-cremention",
        element: <NoServiceCrementionPage />,
      },
      {
        path: "/packages/viewing-and-cremention",
        element: <ViewingAndCrementionPage />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },

      {
        path: "/packages/standard/register",
        element: <Registrarion />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/packages/basic/register",
        element: <Registrarion />,
      },
      // {
      //   path: "/:totalPrice/packages/basic/prepage",
      //   element: <PaynowPage />,
      // },

      {
        path: "/fill-agreement-form",
        element: <AgreementFormPage />,
        isPrivate: true,
      },
      {
        path: "/blogs",
        element: <BlogPage />,
        isPrivate: false,
      },
      {
        path: "/create-new-blog",
        element: <CreateBlog />,
        isPrivate: false,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "/pay-now",
        element: <InvoicePage />,
        isPrivate: true,
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      {
        path: "/prepay",
        element: <PrePayindex />,
        isPrivate: true,
      },
      {
        path: "/invoicePdf",
        element: <StaticInvoicePDF />,
        isPrivate: true,
      },
      {
        path: "/user",
        element: <UserPage />,
        isPrivate: true,
      },
    ],
  },
]);
