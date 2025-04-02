import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/cart/", { withCredentials: true });
      setCart(response.data.cart || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  // Get cart items
  const getCartItems = () => {
    return cart;
  };

  // Add item to cart
  const addToCart = async (product_id, quantity = 1) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/cart/add",
        { product_id, quantity },
        { withCredentials: true }
      );
      console.log(response.data);
      if (response.data.success) {
        await fetchCart(); // Refresh local cart state
        return true;
      } else {
        setError(response.data.message || "Failed to add item to cart");
        return false;
      }
    } catch (error) {
      console.error("Cart addition error:", error);
      setError(
        error.response?.data?.message || 
        error.message || 
        "Failed to add item to cart"
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (id) => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/v1/cart/remove/${id}",
        // { product_id },
        { withCredentials: true }
      );
      await fetchCart(); // Refresh cart after removing
      return true;
    } catch (error) {
      console.error("Error removing from cart:", error);
      setError("Failed to remove item from cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update cart item quantity
  const updateCart = async (product_id, quantity) => {
    try {
      setLoading(true);
      if (quantity <= 0) {
        return await removeFromCart(product_id);
      }
      
      await axios.post(
        "http://localhost:3000/api/v1/cart/update",
        { product_id, quantity },
        { withCredentials: true }
      );
      await fetchCart(); // Refresh cart after updating
      return true;
    } catch (error) {
      console.error("Error updating cart:", error);
      setError("Failed to update cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Calculate total price of items in cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Initialize cart on component mount
  useEffect(() => {
    fetchCart();
  }, []);

  // Value object with all cart operations
  const cartContextValue = {
    cart,
    loading,
    error,
    getCartItems,
    addToCart,
    removeFromCart,
    updateCart,
    calculateTotal,
    fetchCart
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};