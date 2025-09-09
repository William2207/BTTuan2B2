// src/components/ProductList.jsx

import React, { useState, useEffect, useCallback } from "react";
import axios from "../utils/axios.customize";
import { debounce } from "lodash";

// --- Các Component con để giao diện gọn gàng hơn ---

// Component ô tìm kiếm
const SearchInput = ({ setSearchTerm }) => {
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 500), // Chờ 500ms sau khi người dùng ngừng gõ mới tìm kiếm
    []
  );

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Tìm kiếm sản phẩm..."
      onChange={handleChange}
      className="product-search-input"
    />
  );
};

// Component hiển thị một sản phẩm
const ProductCard = ({ product }) => (
  <div className="product-card">
    <img
      src={product.image || "https://via.placeholder.com/150"}
      alt={product.name}
    />
    <h3>{product.name}</h3>
    <p className="product-category">{product.category}</p>
    <p className="product-price">{product.price.toLocaleString("vi-VN")} ₫</p>
  </div>
);

// Component phân trang
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

// --- Component chính: ProductList ---

const ProductList = () => {
  // State quản lý danh sách sản phẩm và thông tin liên quan
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State quản lý các bộ lọc và tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // State quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Hàm gọi API để lấy sản phẩm
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: 12, // Hiển thị 12 sản phẩm mỗi trang
        q: searchTerm,
        category: category,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        sortBy: sortBy,
        order: order,
      };

      // Chỉ thêm các tham số có giá trị vào URL
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v != null && v !== "")
      );

      const response = await axios.get("/api/products", {
        params: filteredParams,
      });

      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Không thể tải danh sách sản phẩm.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Sử dụng useEffect để gọi API mỗi khi các bộ lọc hoặc trang thay đổi
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, category, priceRange, sortBy, order, currentPage]);

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Hàm xử lý khi thay đổi khoảng giá
  const handlePriceChange = (e) => {
    setPriceRange({ ...priceRange, [e.target.name]: e.target.value });
  };

  return (
    <div className="product-list-container">
      <h1>Khám phá sản phẩm</h1>

      {/* Khu vực bộ lọc */}
      <div className="filters">
        <SearchInput setSearchTerm={setSearchTerm} />

        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">Tất cả danh mục</option>
          <option value="thoi-trang-nam">Thời trang nam</option>
          <option value="thoi-trang-nu">Thời trang nữ</option>
          <option value="phu-kien">Phụ kiện</option>
        </select>

        <div className="price-filter">
          <input
            type="number"
            name="min"
            placeholder="Giá từ"
            value={priceRange.min}
            onChange={handlePriceChange}
          />
          <input
            type="number"
            name="max"
            placeholder="Giá đến"
            value={priceRange.max}
            onChange={handlePriceChange}
          />
        </div>

        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Mới nhất</option>
          <option value="price">Giá</option>
          <option value="views">Lượt xem</option>
        </select>
        <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
          {order === "asc" ? "Tăng dần" : "Giảm dần"}
        </button>
      </div>

      {/* Khu vực hiển thị sản phẩm */}
      {loading && <p>Đang tải...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && (
        <>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>Không tìm thấy sản phẩm nào.</p>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;
