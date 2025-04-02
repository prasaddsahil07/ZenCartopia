import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductItem from "../components/ProductItem";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/product/searchProducts?query=${query}`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold">Search Results for "{query}"</h2>
      <div className="grid grid-cols-4 gap-6 mt-4">
        {products.length > 0 ? (
          products.map((product) => <ProductItem key={product.product_id} product={product} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
