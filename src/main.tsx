import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { AuthContext } from "./auth/auth-provider";
import "./index.css";
import { routes } from "./utils/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  ...routes,
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  </React.StrictMode>
);
