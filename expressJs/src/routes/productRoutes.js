// routes/productRoutes.js

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route cho việc tìm kiếm và lọc sản phẩm
// GET /api/products/search?q=ao&category=thoi-trang&maxPrice=500000
router.get("/search", productController.searchProducts);

module.exports = router;