import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ViewMore = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/v1/product/getProductsByCategory/${category}`
                );
                setProducts(res.data);
            } catch (error) {
                console.error(`Error fetching products for ${category}:`, error);
            }
            setLoading(false);
        };

        if (category) {
            fetchProducts();
        }
    }, [category]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            {/* Back Button */}
            <div className="max-w-6xl w-full mx-auto flex justify-start items-center mb-6 py-4 px-4">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                >
                    <FaArrowLeft className="text-lg" />
                    <span className="text-lg font-medium">Back to Home</span>
                </Link>
            </div>


            {/* Category Header */}
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">{category}</h1>
                <p className="text-gray-500 mt-2">Discover top products in this category</p>
            </div>
            {/* Product List */}
            {loading ? (
                <p className="text-gray-600 text-center mt-10">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="text-gray-600 text-center">No products available.</p>
            ) : (
                <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductItem key={product.product_id} product={product} />
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default ViewMore;
