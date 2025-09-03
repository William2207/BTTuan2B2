import React, { useState, useEffect, useRef } from "react";
import axios from "../utils/axios.customize";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState("all"); // Default category
  const observer = useRef();

  // Fetch products when page or category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/products?category=${category}&page=${page}&limit=10`
        );
        if (page === 1) {
          setProducts(response.data.data); // Reset products if category changes
        } else {
          setProducts((prev) => [...prev, ...response.data.data]);
        }
        setHasMore(page < response.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [page, category]);

  // Observer for lazy loading
  const lastProductRef = (node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  };

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset page to 1 when category changes
    setProducts([]); // Clear current products
  };

  return (
    <div>
      <h1>Product List</h1>

      {/* Category Selector */}
      <div className="category-selector">
        <button onClick={() => handleCategoryChange("all")}>All</button>
        <button onClick={() => handleCategoryChange("clothes")}>Clothes</button>
        <button onClick={() => handleCategoryChange("hats")}>Hats</button>
        <button onClick={() => handleCategoryChange("accessories")}>
          Accessories
        </button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return (
              <div
                ref={lastProductRef}
                key={product._id}
                className="product-item"
              >
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            );
          } else {
            return (
              <div key={product._id} className="product-item">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            );
          }
        })}
      </div>

      {!hasMore && <p>No more products to load.</p>}
    </div>
  );
};

export default ProductList;
