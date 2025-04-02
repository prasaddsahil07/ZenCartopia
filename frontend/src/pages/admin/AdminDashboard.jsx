import { Link } from "react-router-dom";
import { useState } from "react";
import { FiBox, FiUsers, FiShoppingCart, FiBarChart2, FiMenu, FiX } from "react-icons/fi";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg p-5 ${sidebarOpen ? "w-64" : "w-20"} transition-all duration-300`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-4 text-gray-700 focus:outline-none">
          {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <nav className="space-y-4">
          <Link to="/admin/products" className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg">
            <FiBox size={20} className="mr-3" /> {sidebarOpen && "Manage Products"}
          </Link>
          <Link to="/admin/sellers" className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg">
            <FiUsers size={20} className="mr-3" /> {sidebarOpen && "Manage Sellers"}
          </Link>
          <Link to="/admin/orders" className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg">
            <FiShoppingCart size={20} className="mr-3" /> {sidebarOpen && "Manage Orders"}
          </Link>
          <Link to="/admin/analytics" className="flex items-center p-3 text-gray-700 hover:bg-gray-200 rounded-lg">
            <FiBarChart2 size={20} className="mr-3" /> {sidebarOpen && "View Analytics"}
          </Link>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg">Total Sales</h2>
              <p className="text-2xl font-bold">$10,250</p>
            </div>
            <FiBarChart2 size={32} />
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg">Total Products</h2>
              <p className="text-2xl font-bold">320</p>
            </div>
            <FiBox size={32} />
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg">Total Orders</h2>
              <p className="text-2xl font-bold">1,220</p>
            </div>
            <FiShoppingCart size={32} />
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <h2 className="text-lg">Total Sellers</h2>
              <p className="text-2xl font-bold">45</p>
            </div>
            <FiUsers size={32} />
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3">#10234</td>
                <td className="p-3">John Doe</td>
                <td className="p-3">$299</td>
                <td className="p-3 text-green-500">Shipped</td>
              </tr>
              <tr className="border-b">
                <td className="p-3">#10235</td>
                <td className="p-3">Alice Smith</td>
                <td className="p-3">$450</td>
                <td className="p-3 text-yellow-500">Pending</td>
              </tr>
              <tr>
                <td className="p-3">#10236</td>
                <td className="p-3">Bob Johnson</td>
                <td className="p-3">$150</td>
                <td className="p-3 text-red-500">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
