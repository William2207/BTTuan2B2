const Product = require("../models/product");

// Get products by category with pagination
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ category }).skip(skip).limit(limit);

    const total = await Product.countDocuments({ category });

    res.status(200).json({
      success: true,
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProductsByCategory };
