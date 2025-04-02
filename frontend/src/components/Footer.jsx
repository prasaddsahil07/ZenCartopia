import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">ZenCartopia</p>
        <p className="text-sm mt-1">&copy; {new Date().getFullYear()} ZenCartopia. All rights reserved.</p>
        
        <div className="flex justify-center mt-4 space-x-6">
          <a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <a href="#" className="text-gray-400 hover:text-white transition">Facebook</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
          <a href="#" className="text-gray-400 hover:text-white transition">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
