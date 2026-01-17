import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/index.css";
import "../assets/css/pdf.css";
import { routes } from "./routes";
import { SelectedServiceProvider } from "./utility/SelectedServiceProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SelectedServiceProvider>
      <RouterProvider router={routes} />
    </SelectedServiceProvider>
  </StrictMode>
);
