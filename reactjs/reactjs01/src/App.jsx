import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";

import "./App.css";
import Header from "./components/layout/header.jsx";
import ProductList from "./components/ProductList";
import axios from "./utils/axios.customize.js";
import { AuthContext } from "./components/context/auth.context.jsx";

function App() {
  const { auth, setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get("/v1/api/user");
        setAuth({
          isAuthenticated: true,
          user: response.data,
        });
      } catch (error) {
        console.error("Error fetching account:", error);
        setAuth({
          isAuthenticated: false,
          user: {
            email: "",
            name: "",
          },
        });
      } finally {
        setAppLoading(false);
      }
    };
    fetchAccount();
  }, [setAuth, setAppLoading]);

  if (appLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;