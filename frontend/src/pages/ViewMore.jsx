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
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [sortOrder, setSortOrder] = useState("lowToHigh");

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/v1/product/getProductsByCategory/${category}`
                );
                setProducts(res.data);
                setFilteredProducts(res.data);
            } catch (error) {
                console.error(`Error fetching products for ${category}:`, error);
            }
            setLoading(false);
        };

        if (category) {
            fetchProducts();
        }
    }, [category]);

    useEffect(() => {
        let filtered = products.filter(
            (product) => product.product_price >= priceRange[0] && product.product_price <= priceRange[1]
        );
        if (sortOrder === "lowToHigh") {
            filtered.sort((a, b) => a.product_price - b.product_price);
        } else {
            filtered.sort((a, b) => b.product_price - a.product_price);
        }
        setFilteredProducts(filtered);
    }, [priceRange, sortOrder, products]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            {/* Back Button */}
            <div className="max-w-7xl w-full mx-auto flex justify-start items-center mb-6 py-4 px-4">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                >
                    <FaArrowLeft className="text-lg" />
                    <span className="text-lg font-medium">Back to Home</span>
                </Link>
            </div>

            {/* Category Header */}
            <div className="max-w-7xl mx-auto text-center mb-10">
                <h1 className="text-5xl font-bold text-gray-800">{category}</h1>
                <p className="text-gray-500 mt-2 text-lg">Discover top products in this category</p>
            </div>

            {/* Filters */}
            <div className="max-w-full mx-auto flex flex-col md:flex-row justify-between items-center mb-12 px-4 gap-12">
                <div className="w-full md:w-1/2">
                    <label className="text-gray-700 block mb-4 text-lg font-medium">Filter by Price:</label>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                        className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-gray-700 text-sm mt-4">
                        <span>₹0</span>
                        <span>₹{priceRange[1]}</span>
                    </div>
                </div>
                <div>
                    <label className="text-gray-700 block mb-4 text-lg font-medium">Sort by:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-6 py-3 border rounded-lg bg-white text-gray-700 text-lg shadow-md"
                    >
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Product List */}
            {loading ? (
                <p className="text-gray-600 text-center mt-10">Loading products...</p>
            ) : filteredProducts.length === 0 ? (
                <p className="text-gray-600 text-center">No products available.</p>
            ) : (
                <div className="max-w-screen-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 space-y-4 space-x-4">
                    {filteredProducts.map((product) => (
                        <ProductItem key={product.product_id} product={product} />
                    ))} 
                </div>
            )}
            <Footer />
        </div>
    );
};

export default ViewMore;
