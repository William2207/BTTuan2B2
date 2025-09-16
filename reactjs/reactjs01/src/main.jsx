import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { AuthWrapper } from "./components/context/auth.context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import components trực tiếp thay vì lazy loading để tránh lỗi
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "user",
        lazy: () => import("./pages/user.jsx"),
      },
      {
        path: "forgot-password",
        lazy: () => import("./pages/forgotpass.jsx"),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </StrictMode>
);
