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
    const { product_id } = req.params;
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { product_id, product_category_name, product_name, product_description, product_price, product_photos } = req.body;

    if(!product_id || !product_name || !product_price || !product_photos){
        return res.status(401).json({ message: "Fill all the required fields." });
    }

    const product = await Product.create({
      product_id,
      product_category_name,
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
      where: {
        [Product.sequelize.Op.or]: [
          { product_name: { [Product.sequelize.Op.like]: `%${query}%` } },
          { product_description: { [Product.sequelize.Op.like]: `%${query}%` } },
        ],
      },
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
      where: { product_category_name: category },
    });
    if (!products || products.length === 0) return res.status(404).json({ message: "No products found for this category" });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getRecommendedProducts = async (req, res) => {
    try {
      const { product_id } = req.params;
  
      // Find the product first to get its category
      const product = await Product.findByPk(product_id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Find other products in the same category, excluding the current product
      const recommendedProducts = await Product.findAll({
        where: {
          product_category_name: product.product_category_name,
          product_id: { [Op.ne]: product_id },
        },
        limit: 5, // You can adjust the limit as needed
        order: [["createdAt", "DESC"]], // Order by newest first or any other logic
      });
  
      res.json({
        message: "Recommended products fetched successfully",
        recommended: recommendedProducts,
      });
    } catch (error) {
      console.error("Error fetching recommended products:", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };