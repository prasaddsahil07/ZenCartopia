import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RecommendedProducts = ({ cart }) => {
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const categories = [...new Set(
        cart
          .filter(item => item.category) // Only include items with category
          .map(item => item.category)
      )];

      // Skip if no valid categories found
      if (categories.length === 0) {
        setRecommended([]);
        return;
      }
      
      try {
        // Get unique categories from cart items
        const categories = [...new Set(cart.map(item => item.category))];
        
        // Fetch recommendations based on categories
        const response = await axios.get(
          "http://localhost:3000/api/v1/product/recommendations",
          {
            params: { categories: categories.join(",") },
            withCredentials: true
          }
        );

        // Filter out items already in cart
        const cartProductIds = cart.map(item => item.product_id);
        const filteredRecommendations = response.data.products.filter(
          product => !cartProductIds.includes(product.product_id)
        );

        setRecommended(filteredRecommendations);
      } catch (err) {
        console.error("Recommendation error:", err);
        setError("Failed to load recommendations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [cart]);

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <p>Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        {error}
      </div>
    );
  }

  if (recommended.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended for You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommended.slice(0, visibleCount).map((product) => (
          <div key={product.product_id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-square bg-gray-100">
              <img
                src={product.product_image || "/placeholder.png"}
                alt={product.product_name}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
            </div>
            <div className="p-3 text-center">
              <h4 className="font-semibold text-sm mb-1 line-clamp-2">{product.product_name}</h4>
              <span className="font-bold text-pink-600">₹{product.price}</span>
              <Link to={`/product/${product.product_id}`}>
                <button className="mt-2 w-full bg-pink-50 text-pink-600 py-2 rounded-md hover:bg-pink-100 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < recommended.length && (
        <button 
          onClick={() => setVisibleCount(prev => prev + 4)}
          className="mt-4 w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default RecommendedProducts;