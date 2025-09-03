import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Spin } from "antd";

import "./App.css";
import Header from "./components/layout/header.jsx";
import ProductList from "./components/ProductList";
import axios from "./utils/axios.customize.js";
import { AuthContext } from "./components/context/auth.context.jsx";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
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
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <>
                <Header />
                <div className="category-filter">
                  <button onClick={() => handleCategoryChange("all")}>
                    All
                  </button>
                  <button onClick={() => handleCategoryChange("clothes")}>
                    Clothes
                  </button>
                  <button onClick={() => handleCategoryChange("hats")}>
                    Hats
                  </button>
                  <button onClick={() => handleCategoryChange("accessories")}>
                    Accessories
                  </button>
                </div>
                <ProductList category={selectedCategory} />
              </>
            }
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
