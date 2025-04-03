import { createContext, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized]  = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => { // Wrap with useCallback
    try {
      setLoading(true);
      const response = await axios.get("/api/v1/cart/myCart", { withCredentials: true });
      setCart(response.data.cart || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialized) { // Only fetch if not initialized
      fetchCart();
      setInitialized(true);
    }
  }, [fetchCart, initialized]);

  // Get cart items
  const getCartItems = () => {
    return cart;
  };

  // Add item to cart
  // In your CartContext.js
const addToCart = async (product_id, quantity = 1) => {
  try {
    setLoading(true);
    const response = await axios.post(
      "http://localhost:3000/api/v1/cart/add",
      { product_id, quantity },
      { withCredentials: true }
    );
    
    if (response.data.success) {
      // Optimistically update local state
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.product_id === product_id);
        if (existingItem) {
          return prevCart.map(item =>
            item.product_id === product_id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Make sure the response contains all required product details
          return [
            ...prevCart,
            {
              product_id,
              product_name: response.data.product?.product_name || "Unknown Product",
              product_image: response.data.product?.product_image || "/placeholder.png",
              price: response.data.product?.price || 0,
              category: response.data.produc?.product_category_name_english, 
              quantity
            }
          ];
        }
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Add to cart error:", error);
    setError(error.response?.data?.message || "Failed to add item");
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

const useCart = () => useContext(CartContext);
export {useCart};