// src/pages/Home.jsx

import Header from "../components/layout/header.jsx";
import ProductList from "../components/ProductList";
import React from "react"; // Import React nếu chưa có

function Home() {
  return (
    <div>
      <Header />
      <div style={{ marginTop: "20px", padding: "0 20px" }}>
        <ProductList />
      </div>
    </div>
  );
}

export default Home;
