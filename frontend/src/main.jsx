import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../assets/css/index.css";
import "../assets/css/pdf.css";
import { routes } from "./routes";
import { ToastProvider } from "./utility/toast-context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={routes} />
    </ToastProvider>
  </StrictMode>
);
