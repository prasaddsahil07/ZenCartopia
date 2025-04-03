import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import RecommendedProducts from "../components/Recommended";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CartPage = () => {
  const { cart, loading, fetchCart } = useCart();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        await fetchCart();
        setInitialLoadComplete(true);
      } catch (error) {
        console.error("Failed to load cart:", error);
        setInitialLoadComplete(true); // Still mark as complete even if error
      }
    };

    // Only fetch if we haven't loaded yet and cart is empty
    if (!initialLoadComplete && cart.length === 0) {
      loadCart();
    }
  }, [cart.length, initialLoadComplete, fetchCart]);

  // Show loading state only during initial load when cart is empty
  if (!initialLoadComplete && cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-600">Loading your cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto flex-grow mt-8 mb-12">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">🛒 Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">Your cart is empty. Start adding some products! 🛍️</p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))}
            </div>
            <RecommendedProducts cart={cart} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;