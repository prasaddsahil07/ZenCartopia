import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecommendedProducts = ({ cart }) => {
  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (cart.length === 0) {
      setRecommended([]);
      setIsLoading(false);
      return;
    }
    
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const recommendations = [];
        
        for (const item of cart) {
          const response = await fetch(`http://localhost:3000/api/v1/product/${item.product_id}/recommendations`);
          const data = await response.json();
          if (data.recommended) {
            recommendations.push(...data.recommended);
          }
        }

        // Remove duplicate products
        const uniqueRecommendations = recommendations.filter((product, index, self) =>
          index === self.findIndex((p) => p.product_id === product.product_id)
        );
        
        setRecommended(uniqueRecommendations);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
      setIsLoading(false);
    };

    fetchRecommendations();
  }, [cart]);

  if (isLoading) {
    return <p>Loading recommended products...</p>;
  }

  if (recommended.length === 0) {
    return null; // Don't render anything if there are no recommendations
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended for You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommended.slice(0, visibleCount).map((product) => (
          <div key={product.product_id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative aspect-square bg-gray-100">
              <img
                src={product.img}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center">
              <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
              <span className="font-bold text-pink-600">₹{product.price}</span>
              <Link to={`/${product.product_id}`}>
                <button className="mt-2 w-full bg-pink-50 text-pink-600 py-2 rounded-md hover:bg-pink-100">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < recommended.length && (
        <button 
          onClick={() => setVisibleCount((prev) => prev + 4)}
          className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default RecommendedProducts;
