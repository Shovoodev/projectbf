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
import Refund_Policy from "./pages/Refund_Policy";
import Resources from "./pages/Resources";
import ServiceArea from "./pages/Service-Area";
import Team from "./pages/Team";
import Testimonials from "./pages/Testimonials";

import BlankLayout from "./BlankLayout";

import AttendenceCrementionPage from "./pages/packages/AttendenceCrementionPage";
import Registrarion from "./pages/Registration";
import LoginScreen from "./pages/SignIn";

import BlogPage from "./pages/blog/BlogPage";
import CreateBlog from "./pages/blog/_component/CreateBlog";
import BlogDetails from "./pages/blog/_component/BlogDetails";

import NoServiceCrementionPage from "./pages/packages/NoServiceCrementionPage";
import ViewingAndCrementionPage from "./pages/packages/ViewingAndCremention";
import PrePayindex from "./pages/prepay";
import Signature from "./pages/Signature";
import AgreementFormPage from "./pages/packages/Agreement";
import Packages from "./pages/Packages";

import Registration from "./pages/Registration";
import InvoicePage from "./pages/pay/InvoicePage";
import StaticInvoicePDF from "./pages/packages/_components/StaticInvoicePDF";
import NewsDetails from "./components/pages/News/_components/NewsDetails";
import EditBlog from "./pages/blog/_component/EditBlog";
import SignIn from "./pages/admin/SignIn";
import Register from "./pages/admin/Register";
import Error from "./pages/Error";
import Intro_video from "./pages/Intro_video";
import Attending_Cremation_Landing from "./pages/Attending_Cremation_Landing";
import RouteGuard from "./utility/RouteGuard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouteGuard>
        <App />
      </RouteGuard>
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/video", element: <Intro_video /> },

      { path: "/team", element: <Team /> },
      { path: "/news", element: <News /> },
      { path: "/news/:id", element: <NewsDetails /> },
      { path: "/contact", element: <Contact /> },
      { path: "/music", element: <MusicSection /> },
      { path: "/chepels", element: <Chapels /> },
      { path: "/coffins", element: <Coffins /> },
      { path: "/live-music", element: <LiveMusic /> },
      { path: "/resources", element: <Resources /> },
      { path: "/service-area", element: <ServiceArea /> },
      { path: "/landing-page", element: <LandingPage /> },
      { path: "/faq", element: <Faq /> },
      { path: "/testimonials", element: <Testimonials /> },
      { path: "/refund-policy", element: <Refund_Policy /> },
      { path: "/disclaimer", element: <Disclaimer /> },
      { path: "/ash-storage", element: <Ash_Storage /> },
      { path: "/expansion", element: <Expansion /> },
      { path: "/packages", element: <Packages /> },
      { path: "/about-btf", element: <Btf /> },
      { path: "/signature", element: <Signature /> },

      { path: "/packages/attending-service-cremation", element: <AttendenceCrementionPage /> },
      { path: "/packages/no-service-cremention", element: <NoServiceCrementionPage /> },
      { path: "/packages/viewing-and-cremention", element: <ViewingAndCrementionPage /> },

      { path: "/login", element: <LoginScreen /> },
      { path: "/packages/standard/register", element: <Registrarion /> },
      { path: "/register", element: <Registration /> },
      { path: "/packages/basic/register", element: <Registrarion /> },

      {
        path: "/fill-agreement-form",
        element: <AgreementFormPage />,
        handle: { requiresAuth: true },
      },
      {
        path: "/pay-now",
        element: <InvoicePage />,
        handle: { requiresAuth: true },
      },

      { path: "/blog", element: <BlogPage /> },
      { path: "/edit-blog/:id", element: <EditBlog /> },
      { path: "/create-new-blog", element: <CreateBlog /> },
      { path: "/blog/:id", element: <BlogDetails /> },

      { path: "/attending-cremation-landing", element: <Attending_Cremation_Landing /> },

      { path: "*", element: <Error /> },
    ],
  },

  {
    element: (
      <RouteGuard>
        <BlankLayout />
      </RouteGuard>
    ),
    children: [
      { path: "/prepay", element: <PrePayindex />, handle: { requiresAuth: true } },
      { path: "/invoicePdf", element: <StaticInvoicePDF />, handle: { requiresAuth: true } },
      { path: "/administration-btf", element: <SignIn />, handle: { requiresAuth: true } },
      { path: "/add-new-btf-admin", element: <Register />, handle: { requiresAuth: true } },
    ],
  },
]);
