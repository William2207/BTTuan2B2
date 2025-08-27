import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { AuthWrapper } from './components/context/auth.context.jsx';
import{
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index : true,
        element: <div>Home Page</div>,
      },
      {
        path: "user",
        lazy: () => import("./pages/user.jsx"),
      },
      {
        path: "login",
        lazy: () => import("./pages/login.jsx"),
      },
      {
        path: "register",
        lazy: () => import("./pages/register.jsx"),
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </StrictMode>,
)
