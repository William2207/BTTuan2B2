import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/layout/header.jsx";
import axios from "./utils/axios.customize.js";
import { AuthContext } from "./components/context/auth.context.jsx";
import { Spin } from "antd";

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

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

  return (
    <>
      {appLoading ? (
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
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </>
  );
}

export default App;
