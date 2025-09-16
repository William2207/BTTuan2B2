import React, { useState, useEffect } from "react";
import { Card, Typography, Alert, Button, Row, Col, Divider } from "antd";
import {
  AppstoreOutlined,
  ShoppingOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { productsAPI, categoriesAPI } from "../utils/api";
import api from "../utils/api";

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      // Fetch user if token exists
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userResponse = await api.get("/auth/me");
          setUser(userResponse.data.user);
        } catch (err) {
          console.log("User not logged in");
        }
      }

      // Fetch featured products and categories
      const [productsResponse, categoriesResponse] = await Promise.all([
        productsAPI.getFeatured({ limit: 8 }),
        categoriesAPI.getAll(),
      ]);

      setFeaturedProducts(productsResponse.data.data);
      setCategories(categoriesResponse.data.data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu trang chủ:", err);
      setError("Không thể tải dữ liệu trang chủ");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  const handleViewDetail = (product) => {
    console.log("Xem chi tiết sản phẩm:", product);
    // TODO: Navigate to product detail page
  };

  const handleAddToCart = (product) => {
    console.log("Thêm vào giỏ hàng:", product);
    // TODO: Add to cart functionality
  };

  return (
    <div>
      {/* Hero Section */}
      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <div>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Title level={2}>Sản phẩm nổi bật</Title>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Những sản phẩm được yêu thích nhất
            </Text>
          </div>

          <Row gutter={[16, 16]}>
            {featuredProducts.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <ProductCard
                  product={product}
                  onViewDetail={handleViewDetail}
                  onAddToCart={handleAddToCart}
                />
              </Col>
            ))}
          </Row>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/products")}
            >
              Xem tất cả sản phẩm
            </Button>
          </div>
        </div>
      )}

      {error && (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          style={{ marginTop: 16 }}
        />
      )}
    </div>
  );
};

export default Home;
