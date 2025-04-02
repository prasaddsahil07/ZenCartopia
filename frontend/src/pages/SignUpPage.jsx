import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Home, MapPin, Image, UserCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SignUpPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customer_unique_id: "",
    customer_password: "",
    customer_name: "",
    customer_id: "",
    customer_zip_code_prefix: "",
    customer_city: "",
    customer_state: "",
    customer_profile_pic: "",
    customer_role: "customer",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

        {/* Name */}
        <div className="relative mb-4">
          <User className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="customer_name"
            placeholder="Full Name"
            value={formData.customer_name}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Email as customer_unique_id */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            name="customer_unique_id"
            placeholder="Email Address"
            value={formData.customer_unique_id}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            name="customer_password"
            placeholder="Password"
            value={formData.customer_password}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Customer ID */}
        <div className="relative mb-4">
          <Home className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="customer_id"
            placeholder="Customer ID"
            value={formData.customer_id}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Zip Code */}
        <div className="relative mb-4">
          <MapPin className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="customer_zip_code_prefix"
            placeholder="Zip Code"
            value={formData.customer_zip_code_prefix}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* City */}
        <div className="relative mb-4">
          <Home className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="customer_city"
            placeholder="City"
            value={formData.customer_city}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* State */}
        <div className="relative mb-4">
          <MapPin className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="customer_state"
            placeholder="State"
            value={formData.customer_state}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Profile Picture URL */}
        <div className="relative mb-4">
          <Image className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            name="customer_profile_pic"
            placeholder="Profile Picture URL"
            value={formData.customer_profile_pic}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Role Selector */}
        <div className="relative mb-6">
          <UserCheck className="absolute left-3 top-3 text-gray-400" />
          <select
            name="customer_role"
            value={formData.customer_role}
            onChange={handleChange}
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200">
          Sign Up
        </button>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
