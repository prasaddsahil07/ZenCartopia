import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CustomerProfilePage = () => {
  const [customer, setCustomer] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_zip_code_prefix: "",
    customer_city: "",
    customer_state: "",
    customer_profile_pic: "",
    customer_password: ""
  });

  const navigate = useNavigate();

  // Fetch customer data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/profile");
        setCustomer(res.data);
        setFormData({
          customer_name: res.data.customer_name,
          customer_zip_code_prefix: res.data.customer_zip_code_prefix,
          customer_city: res.data.customer_city,
          customer_state: res.data.customer_state,
          customer_profile_pic: res.data.customer_profile_pic,
          customer_password: ""
        });
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/auth/profile", formData);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Full-width Header */}
      <Header />

      {/* Profile Section */}
      <div className="flex-grow flex justify-center items-center bg-gray-100 px-6 py-10">
        <div className="bg-gray-300 p-8 rounded-xl shadow-xl max-w-xl w-full">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
            Customer Profile
          </h1>

          {/* Profile Details */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <strong className="text-lg text-gray-700">Name:</strong>
              <p className="text-lg text-gray-600">{customer.customer_name}</p>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-lg text-gray-700">Email:</strong>
              <p className="text-lg text-gray-600">{customer.customer_id}</p>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-lg text-gray-700">Zip Code:</strong>
              <p className="text-lg text-gray-600">{customer.customer_zip_code_prefix}</p>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-lg text-gray-700">City:</strong>
              <p className="text-lg text-gray-600">{customer.customer_city}</p>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-lg text-gray-700">State:</strong>
              <p className="text-lg text-gray-600">{customer.customer_state}</p>
            </div>
            <div className="flex justify-between items-center">
              <strong className="text-lg text-gray-700">Profile Picture:</strong>
              <img
                src={customer.customer_profile_pic || "/placeholder.png"}
                alt="Profile"
                className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
              />
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md transition hover:bg-blue-700 focus:outline-none"
            >
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Edit Profile Form */}
          {editMode && (
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-gray-700 font-medium">Name</label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Zip Code</label>
                  <input
                    type="text"
                    name="customer_zip_code_prefix"
                    value={formData.customer_zip_code_prefix}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">City</label>
                  <input
                    type="text"
                    name="customer_city"
                    value={formData.customer_city}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">State</label>
                  <input
                    type="text"
                    name="customer_state"
                    value={formData.customer_state}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Profile Picture</label>
                  <input
                    type="text"
                    name="customer_profile_pic"
                    value={formData.customer_profile_pic}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Password</label>
                  <input
                    type="password"
                    name="customer_password"
                    value={formData.customer_password}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-md transition hover:bg-blue-700 focus:outline-none"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Full-width Footer */}
      <Footer />
    </div>
  );
};

export default CustomerProfilePage;
