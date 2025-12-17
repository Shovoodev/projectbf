import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Home from "./pages/Home";
import Service from "./pages/Service";

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
        path: "/service",
        element: <Service />,
      },
    ],
  },
]);
