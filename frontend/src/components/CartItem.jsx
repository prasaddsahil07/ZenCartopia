import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateCart, removeFromCart } = useContext(CartContext);

  const handleIncrease = () => updateCart(item.product_id, item.quantity + 1);
  const handleDecrease = () => updateCart(item.product_id, Math.max(1, item.quantity - 1));
  const handleRemove = () => removeFromCart(item.product_id);

  return (
    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-4">
        <img
          src={item.product_image || "/placeholder.png"}
          alt={item.product_name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="text-lg font-semibold">{item.product_name}</h3>
          <p className="text-gray-500">₹{item.price} x {item.quantity}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={handleDecrease} className="px-3 py-1 bg-gray-200 rounded text-lg">-</button>
        <span className="text-lg font-medium">{item.quantity}</span>
        <button onClick={handleIncrease} className="px-3 py-1 bg-gray-200 rounded text-lg">+</button>
        <button onClick={handleRemove} className="ml-4 text-red-500">🗑️</button>
      </div>
    </div>
  );
};

export default CartItem;
