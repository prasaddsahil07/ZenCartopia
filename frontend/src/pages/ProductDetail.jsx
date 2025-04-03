import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Use the CartContext
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = async () => {
    try {
      const success = await addToCart(id, 1);
      if (success) {
        alert("Item added to cart successfully!");
        // Optionally refresh cart data
        // You might want to add fetchCart to your CartContext
      } else {
        alert("Failed to add item to cart");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("An error occurred while adding to cart.");
    }
  };

  const handleOrder = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/product/getProductById/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details.");
      }
      setLoading(false);
    };

    fetchProductDetails();
  }, [id]);

  if (loading) return <p className="text-gray-600 text-center mt-10">Loading product details...</p>;
  if (!product) return <p className="text-gray-600 text-center mt-10">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Back Button */}
        <Link to="/" className="text-gray-600 hover:text-gray-800 flex items-center gap-2 mb-6">
          ← Back to Shop
        </Link>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
            {error}
          </div>
        )}

        {/* Product Details */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={Array.isArray(product.product_photos) ? product.product_photos[0] : product.product_photos}
              alt={product.product_name}
              className="w-full h-[350px] object-contain rounded-lg border border-gray-200"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-9">
            <h1 className="text-3xl font-bold text-gray-800">{product.product_name}</h1>
            <p className="text-xl text-blue-700 font-semibold mt-2">${product.product_price}</p>
            <p className="text-gray-600 mt-4 leading-relaxed">{product.product_description}</p>

            {/* Add to Cart */}
            <div className="space-y-6 mt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300 ease-in-out shadow-md"
              >
                Add to Cart
              </button>
              <button
                onClick={handleOrder}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-lg transition duration-300 ease-in-out shadow-md"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
          {product.reviews?.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                  <p className="text-gray-700 font-medium">{review.user}</p>
                  <p className="text-gray-600 mt-1 italic">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
