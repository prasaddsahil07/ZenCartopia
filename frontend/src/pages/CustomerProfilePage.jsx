import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CustomerProfilePage = () => {
  // Initialize all fields with empty strings to avoid uncontrolled input warnings
  const initialCustomerState = {
    customer_name: "",
    customer_id: "",
    customer_zip_code_prefix: "",
    customer_city: "",
    customer_state: "",
    customer_profile_pic: ""
  };

  const initialFormState = {
    customer_name: "",
    customer_zip_code_prefix: "",
    customer_city: "",
    customer_state: "",
    customer_profile_pic: "",
    customer_password: ""
  };

  const [customer, setCustomer] = useState(initialCustomerState);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Fetch customer data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/v1/auth/profile", {
          withCredentials: true
        });
        
        const profileData = res.data;
        
        // Ensure no null values
        const sanitizedData = {
          customer_name: profileData.customer_name || "",
          customer_id: profileData.customer_id || "",
          customer_zip_code_prefix: profileData.customer_zip_code_prefix || "",
          customer_city: profileData.customer_city || "",
          customer_state: profileData.customer_state || "",
          customer_profile_pic: profileData.customer_profile_pic || ""
        };

        setCustomer(sanitizedData);
        setFormData({
          ...sanitizedData,
          customer_password: "" // Password field stays empty
        });
      } catch (error) {
        console.error("Error fetching profile", error);
        setError(error.response?.data?.message || "Failed to load profile");
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.put(
        "http://localhost:3000/api/v1/auth/profile", 
        {
          customer_name: formData.customer_name,
          customer_zip_code_prefix: formData.customer_zip_code_prefix,
          customer_city: formData.customer_city,
          customer_state: formData.customer_state,
          customer_profile_pic: formData.customer_profile_pic,
          customer_password: formData.customer_password || undefined // Send undefined if empty
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.data.success) {
        setCustomer(response.data.customer);
        setSuccessMessage(response.data.message);
        setEditMode(false);
      } else {
        setError(response.data.message || "Update failed");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                      error.message || 
                      "Failed to update profile";
      setError(errorMsg);
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-600">Loading profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex-grow flex justify-center items-center bg-gray-100 px-6 py-10">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl w-full">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Customer Profile
          </h1>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Profile View Mode */}
          {!editMode && (
            <div className="space-y-4">
              <ProfileField label="Name" value={customer.customer_name} />
              <ProfileField label="Email" value={customer.customer_id} />
              <ProfileField label="Zip Code" value={customer.customer_zip_code_prefix} />
              <ProfileField label="City" value={customer.customer_city} />
              <ProfileField label="State" value={customer.customer_state} />
              <ProfileField 
                label="Profile Picture" 
                value={
                  <img 
                    src={customer.customer_profile_pic || "/placeholder.png"} 
                    alt="Profile" 
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                  />
                } 
              />
              <button
                onClick={() => setEditMode(true)}
                className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </div>
          )}

          {/* Edit Mode */}
          {editMode && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput 
                label="Name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
              />
              <FormInput 
                label="Zip Code"
                name="customer_zip_code_prefix"
                value={formData.customer_zip_code_prefix}
                onChange={handleChange}
              />
              <FormInput 
                label="City"
                name="customer_city"
                value={formData.customer_city}
                onChange={handleChange}
              />
              <FormInput 
                label="State"
                name="customer_state"
                value={formData.customer_state}
                onChange={handleChange}
              />
              <FormInput 
                label="Profile Picture URL"
                name="customer_profile_pic"
                value={formData.customer_profile_pic}
                onChange={handleChange}
              />
              <FormInput 
                label="New Password (leave blank to keep current)"
                name="customer_password"
                type="password"
                value={formData.customer_password}
                onChange={handleChange}
              />
              
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setError(null);
                    // Reset form to current customer data
                    setFormData({
                      ...customer,
                      customer_password: ""
                    });
                  }}
                  className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Reusable components for cleaner code
const ProfileField = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <strong className="text-lg text-gray-700">{label}:</strong>
    <div className="text-lg text-gray-600">{value}</div>
  </div>
);

const FormInput = ({ label, type = "text", ...props }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
      {...props}
    />
  </div>
);

export default CustomerProfilePage;