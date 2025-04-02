import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShippingSummary = () => {
  const navigate = useNavigate();
  
  const [shippingData, setShippingData] = useState({
    order_id: "",
    geolocation_zip_code_prefix: "",
    geolocation_address: "",
    geolocation_city: "",
    geolocation_state: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("http://localhost:3000/api/v1/shippingDetail/create", 
        shippingData,
        {
          withCredentials: true,
        }
      );
      alert("Purchase Successful! Shipping details added.");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete purchase.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handlePurchase} className="space-y-4">
        <input type="text" name="order_id" value={shippingData.order_id} onChange={handleChange} placeholder="Order ID" className="w-full p-2 border rounded" required />
        <input type="text" name="geolocation_zip_code_prefix" value={shippingData.geolocation_zip_code_prefix} onChange={handleChange} placeholder="ZIP Code" className="w-full p-2 border rounded" required />
        <input type="text" name="geolocation_address" value={shippingData.geolocation_address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" required />
        <input type="text" name="geolocation_city" value={shippingData.geolocation_city} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded" required />
        <input type="text" name="geolocation_state" value={shippingData.geolocation_state} onChange={handleChange} placeholder="State" className="w-full p-2 border rounded" required />

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700" disabled={loading}>
          {loading ? "Processing..." : "Purchase"}
        </button>
      </form>
    </div>
  );
};

export default ShippingSummary;
