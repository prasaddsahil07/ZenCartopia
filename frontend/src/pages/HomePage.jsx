import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});

  const categorySectionRef = useRef(null);

  const scrollToCategories = () => {
    if (categorySectionRef.current) {
      categorySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/category");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = {};
      const validCategories = [];
  
      await Promise.all(
        categories.map(async (category) => {
          try {
            const res = await axios.get(
              `http://localhost:3000/api/v1/product/getProductsByCategory/${category.product_category_name_english}`
            );
  
            if (res.data.length > 0) {
              productData[category.product_category_name_english] = res.data
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
              validCategories.push(category); 
            }
          } catch (error) {
            console.error(`Error fetching products for category ${category.product_category_name_english}:`, error);
          }
        })
      );
  
      setProductsByCategory(productData);
      setCategories(validCategories);
    };
  
    if (categories.length > 0) {
      fetchProducts();
    }
  }, [categories]);
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Hero Section */}
      <div className="relative w-full h-[550px] flex flex-col justify-center items-center text-center text-white bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 shadow-xl z-10">
        <h1 className="text-6xl font-extrabold tracking-wide drop-shadow-lg">ZenCartopia</h1>
        <p className="text-lg mt-3 drop-shadow-md font-light max-w-2xl">
          Discover a world of premium products at unbeatable prices. Start shopping today!
        </p>
        <button
          onClick={scrollToCategories}
          className="mt-6 px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-lg font-semibold rounded-full shadow-md flex items-center gap-2 transition-all"
        >
          Start Shopping <FaArrowRight />
        </button>
      </div>

      {/* Categories Section */}
      <section ref={categorySectionRef} className="bg-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">🛍️ Explore Categories</h2>
          {categories.length === 0 ? (
            <p className="text-center text-gray-600">Loading categories...</p>
          ) : (
            <div className="space-y-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all">
                  {/* Category Header: Full Width */}
                  <div className="flex justify-between items-center w-full border-b pb-2">
                    <h3 className="text-xl font-semibold text-gray-700">{category.product_category_name_english}</h3>
                    <Link
                      to={`/viewMore?category=${category.product_category_name_english}`}
                      className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                    >
                      View More
                    </Link>
                  </div>

                  {/* Products Grid - Ensuring Full Width */}
                  <div className="grid grid-cols-4 gap-6 mt-4">
                    {productsByCategory[category.product_category_name_english]?.length > 0 ? (
                      productsByCategory[category.product_category_name_english].map((product, i) => (
                        <ProductItem key={i} product={product} />
                      ))
                    ) : (
                      <p className="text-gray-500 col-span-4 text-center">No products available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
