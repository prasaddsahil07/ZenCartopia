import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";

// Add cart items
export const addItemToCart = async (req, res) => {
  try {
    const { customer_unique_id } = req.customer;
    const { product_id, quantity = 1 } = req.body; // Default quantity to 1

    // Validate input
    if (!product_id) {
      return res.status(400).json({ 
        success: false,
        message: "Product ID is required" 
      });
    }

    // Find customer with cart items
    const customer = await Customer.findByPk(customer_unique_id);
    if (!customer) {
      return res.status(404).json({ 
        success: false,
        message: "Customer not found" 
      });
    }

    // Verify product exists
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ 
        success: false,
        message: "Product not found" 
      });
    }

    // Get current cart or initialize empty array
    const cart = customer.customer_cart_items || [];

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(
      item => item.product_id.toString() === product_id.toString()
    );

    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      cart[existingItemIndex].quantity += Number(quantity);
    } else {
      // Add new item to cart
      cart.push({
        product_id: product.product_id,
        product_name: product.product_name,
        product_price: product.product_price,
        quantity: Number(quantity)
      });
      console.log("Item added to cart from backend")
    }

    // Update the cart in database
    await customer.update({ customer_cart_items: cart });
    console.log("cart updated in db")
    console.log(customer.customer_cart_items);
    return res.status(200).json({ 
      success: true,
      message: "Item added to cart successfully",
      cart 
    });

  } catch (error) {
    console.error("Error in addItemToCart:", error);
    return res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
};

// Remove all cart items
export const removeItemFromCart = async (req, res) => {
  try {
    const { customer_unique_id } = req.customer;
    const { id } = req.params;

    const customer = await Customer.findByPk(customer_unique_id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let cart = customer.customer_cart_items || [];
    cart = cart.filter(item => item.product_id !== id);

    await customer.update({ customer_cart_items: cart });

    return res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update cart items quantity
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { customer_unique_id } = req.customer;
    const { product_id, quantity } = req.body;

    if (!product_id || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product ID or quantity" });
    }

    const customer = await Customer.findByPk(customer_unique_id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let cart = customer.customer_cart_items || [];

    const existingItemIndex = cart.findIndex(item => item.product_id === product_id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity = quantity; // Update quantity
      await customer.update({ customer_cart_items: cart });
      return res.status(200).json({ message: "Cart item updated", cart });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error updating cart item:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Customer's cart
export const getCustomerCart = async (req, res) => {
  try {
    const { customer_unique_id } = req.customer;

    const customer = await Customer.findByPk(customer_unique_id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ cart: customer.customer_cart_items || [] });
  } catch (error) {
    console.error("Error fetching cart:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
