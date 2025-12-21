import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Chapels from "./pages/Chapels";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import MusicSection from "./pages/Music";
import News from "./pages/News";
import Team from "./pages/Team";

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
    ],
  },
]);
