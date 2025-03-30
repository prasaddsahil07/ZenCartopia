import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data Submitted:", formData);
    // TODO: Connect with backend API
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-100 to-orange-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex w-[80%] max-w-4xl">
        {/* Left Side - Login Form */}
        <div className="w-1/2 p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400" onChange={handleChange} />
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition">Login</button>
          </form>
          <p className="text-gray-600 text-center mt-4">Don't have an account? <span className="text-orange-500 cursor-pointer">Sign Up</span></p>
        </div>
        {/* Right Side - Branding */}
        <div className="w-1/2 bg-orange-100 flex flex-col justify-center items-center rounded-2xl p-6">
          <h2 className="text-3xl font-semibold text-orange-600">Brand Logo</h2>
          <p className="text-gray-700 mt-2 text-center">(Some text)</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
