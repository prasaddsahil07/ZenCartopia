import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/product/getAllProducts");
          console.log("Fetched products:", response.data); // Debugging
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error.response ? error.response.data : error.message);
        } finally {
          setLoading(false);
        }
      };
      

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">🛍️ All Products</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.product_id} className="bg-white shadow-md p-4 rounded-lg">
              <img src={product.product_photos} alt={product.product_name} className="w-full h-40 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{product.product_name}</h2>
              <p className="text-gray-600">${product.product_price}</p>

              {/* 🔗 Clicking this Link will take the user to ProductDetail */}
              <Link
                to={`/product/${product.product_id}`} 
                className="text-blue-600 hover:underline mt-2 block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
