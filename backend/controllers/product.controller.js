import Product from "../models/product.model.js";
import { Op } from "sequelize";

// Get all products with pagination and sorting
export const getAllProducts = async (req, res) => {
  try {
    const { limit = 10, offset = 0, sortBy = "createdAt", order = "DESC" } = req.query;
    const products = await Product.findAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, order]],
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Product ID received from request:", id); // Debugging

    const product = await Product.findOne({ where: { product_id: id } }); // ✅ Explicitly querying by `product_id`
    
    if (!product) {
      console.log("No product found for ID:", id);
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { product_id, product_category_name_english, product_name, product_description, product_price, product_photos } = req.body;

    if(!product_id || !product_name || !product_price || !product_photos){
        return res.status(401).json({ message: "Fill all the required fields." });
    }

    const product = await Product.create({
      product_id,
      product_category_name_english,
      product_name,
      product_description,
      product_price,
      product_photos,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an existing product (all fields)
export const updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const updates = req.body;
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.update(updates);
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Search products by name or description
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Please provide a search query" });
    }
    // Using a simple LIKE query; for advanced search consider full-text search options.
    const products = await Product.findAll({
      [Op.or]: [
        { product_name: { [Op.like]: `%${query}%` } },
        { product_category_name_english: { [Op.like]: `%${query}%` } },
      ],
    });
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.findAll({
      where: { product_category_name_english: category },
    });
    if (!products || products.length === 0) return res.status(404).json({ message: "No products found for this category" });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Recommended endpoint in your backend
export const getRecommendedProducts = async (req, res) => {
  try {
    const { categories } = req.query;
    const categoryList = categories?.split(',') || [];
    
    // Get recommended products based on categories
    const recommendedProducts = await Product.findAll({
      where: {
        category: categoryList
      },
      limit: 12,
      order: sequelize.random() // For random recommendations
    });

    res.json({
      success: true,
      products: recommendedProducts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recommendations"
    });
  }
};