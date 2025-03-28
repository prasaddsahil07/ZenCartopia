import Customer from "../models/customer.model.js";

// Add cart items
export const addItemToCart = async (req, res) => {
  try {
    const { customer_unique_id } = req.user; // Extract customer ID from authenticated user
    const { product_id, quantity } = req.body;

    if (!product_id || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product ID or quantity" });
    }

    const customer = await Customer.findByPk(customer_unique_id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let cart = customer.customer_cart_items || [];

    // Check if the product already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.product_id === product_id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1; // Increase quantity if product exists
    } else {
      cart.push({ product_id, quantity });
    }

    await customer.update({ customer_cart_items: cart });

    return res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove all cart items
export const removeItemFromCart = async (req, res) => {
  try {
    const { customer_unique_id } = req.user;
    const { product_id } = req.params;

    const customer = await Customer.findByPk(customer_unique_id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    let cart = customer.customer_cart_items || [];
    cart = cart.filter(item => item.product_id !== product_id);

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
    const { customer_unique_id } = req.user;
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
    const { customer_unique_id } = req.user;

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
