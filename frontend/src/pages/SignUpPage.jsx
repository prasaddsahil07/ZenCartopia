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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg border border-gray-100"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Join Us Today</h2>
          <p className="mt-1 text-sm text-gray-500">Create your account in seconds.</p>
        </div>
  
        {/* Grid Layout for Compactness */}
        <div className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                name="customer_name"
                placeholder="John Doe"
                value={formData.customer_name}
                onChange={handleChange}
                className="text-sm pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
  
          {/* Email */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="email"
                name="customer_unique_id"
                placeholder="your@email.com"
                value={formData.customer_unique_id}
                onChange={handleChange}
                className="text-sm pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Your Id</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                name="customer_id"
                placeholder="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                className="text-sm pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
  
          {/* Password */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="password"
                name="customer_password"
                placeholder="••••••••"
                value={formData.customer_password}
                onChange={handleChange}
                className="text-sm pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
  
          {/* Location Group */}
          <div className="col-span-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">Zip Code</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                name="customer_zip_code_prefix"
                placeholder="12345"
                value={formData.customer_zip_code_prefix}
                onChange={handleChange}
                className="text-sm pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
  
          <div className="col-span-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">State</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                name="customer_state"
                placeholder="CA"
                value={formData.customer_state}
                onChange={handleChange}
                className="text-sm pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
  
          {/* City */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                name="customer_city"
                placeholder="San Francisco"
                value={formData.customer_city}
                onChange={handleChange}
                className="text-sm pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
  
          {/* Profile Picture */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Profile Picture URL <span className="text-gray-400">(Optional)</span>
            </label>
            <div className="relative">
              <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                name="customer_profile_pic"
                placeholder="https://example.com/photo.jpg"
                value={formData.customer_profile_pic}
                onChange={handleChange}
                className="text-sm pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
  
          {/* Role Selector */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-500 mb-1">Account Type</label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                name="customer_role"
                value={formData.customer_role}
                onChange={handleChange}
                className="text-sm pl-9 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2 rounded-md text-sm font-medium shadow-sm transition duration-200"
        >
          Create Account
        </button>
  
        {/* Login Link */}
        <p className="text-center mt-4 text-xs text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
