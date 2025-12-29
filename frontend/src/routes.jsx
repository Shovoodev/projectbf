import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Service from "./pages/Service";
import Team from "./pages/Team";
import News from "./pages/News";
import SignIn from "./pages/SignIn";
import AttendenceCrementionPage from "./pages/packages/AttendenceCrementionPage";
import Registrarion from "./pages/Registration";
import KinDetailsPage from "./pages/packages/KinDetailsPage";
import DeceasedPersonPage from "./pages/packages/DeceasedPersonPage";
import AttendenceCrementionPageFinal from "./pages/packages/AttendenceCrementionPageFinal";

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
