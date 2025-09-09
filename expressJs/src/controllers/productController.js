const Product = require("../models/product");

// Get products by category with pagination
const getProducts = async (req, res) => {
  try {
    // Lấy tất cả các tham số có thể có từ query string
    const { 
      q,                    // Từ khóa tìm kiếm (fuzzy search)
      category,             // Lọc theo danh mục
      minPrice,             // Giá tối thiểu
      maxPrice,             // Giá tối đa
      hasPromotion,         // Có khuyến mãi hay không
      sortBy = "createdAt", // Sắp xếp theo trường nào
      order = "desc",       // Thứ tự sắp xếp
    } = req.query;
    
    // Phân trang
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // 1. Xây dựng đối tượng điều kiện lọc (filters) một cách linh hoạt
    const filters = {};

    // Nếu có từ khóa tìm kiếm `q`, sử dụng regex để tìm kiếm mờ
    if (q) {
      filters.name = { $regex: q, $options: "i" }; // "i" để không phân biệt hoa/thường
    }

    // Nếu có `category`, thêm vào bộ lọc
    if (category) {
      filters.category = category;
    }

    // Nếu có `minPrice` hoặc `maxPrice`, xây dựng bộ lọc giá
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) {
        filters.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        filters.price.$lte = Number(maxPrice);
      }
    }
    
    // Nếu có `hasPromotion`, lọc sản phẩm có khuyến mãi
    // Giả sử model của bạn có trường `promotion: { hasPromotion: Boolean }`
    if (hasPromotion === 'true') {
        filters['promotion.hasPromotion'] = true;
    }

    // 2. Xây dựng đối tượng sắp xếp
    const sortOptions = {};
    sortOptions[sortBy] = order === "asc" ? 1 : -1;

    // 3. Thực thi truy vấn để lấy sản phẩm và tổng số lượng
    const products = await Product.find(filters)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filters);

    // 4. Trả về kết quả
    res.status(200).json({
      success: true,
      message: "Lấy sản phẩm thành công",
      data: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProducts };
