// models/Product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    
    // Thêm các trường để lọc
    views: { type: Number, default: 0 },
    promotion: { 
      hasPromotion: { type: Boolean, default: false },
      discountPercentage: { type: Number, default: 0 }
    },
  },
  { timestamps: true }
);

// Tạo một text index trên trường 'name' để tối ưu hóa tìm kiếm văn bản
productSchema.index({ name: 'text', description: 'text' });


module.exports = mongoose.model("Product", productSchema);