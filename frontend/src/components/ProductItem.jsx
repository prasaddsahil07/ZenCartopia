import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <Link
      to={`/product/${product.product_id}`}
      className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full max-w-2xl"
    >
      <img
        src={product.product_photos}
        alt={product.product_name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-gray-800 font-semibold mt-3 text-lg">{product.product_name}</h2>
      <p className="text-gray-700 mt-1">${product.product_price}</p>
    </Link>
  );
};

export default ProductItem;
