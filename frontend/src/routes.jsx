import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Service from "./pages/Service";
import Team from "./pages/Team";
import News from "./pages/News";

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
    ],
  },
]);
