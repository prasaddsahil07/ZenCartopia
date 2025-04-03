import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Header = ({ user }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Get the cart from CartContext
    const cartContext = useContext(CartContext);

    const {logout} = useAuth();
    
    // Debug to check what's coming from the context
    // useEffect(() => {
    //     console.log("Cart Context:", cartContext);
    // }, [cartContext])

    // Handle click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.length > 2) {
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/product/searchProducts?query=${query}`);
                setSearchResults(res.data);
            } catch (error) {
                console.error("Search error:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
            {/* Brand Name */}
            <Link to="/" className="text-2xl font-bold text-blue-700">
                ZenCartopia
            </Link>

            {/* Search Bar */}
            <form
                onSubmit={handleSubmit}
                className="relative flex items-center bg-white rounded-full px-4 py-2 w-1/2 shadow-md hover:bg-gray-200 transition"
            >
                <FaSearch className="mr-2" />
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full px-3 py-2 rounded-full outline-none text-gray-800 bg-white focus:ring-2 focus:ring-blue-400 transition"
                />
            </form>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
                <div className="absolute top-14 left-1/4 bg-white shadow-md w-[40%] p-2 rounded-lg z-50">
                    {searchResults.map((product) => (
                        <Link
                            key={product.product_id}
                            to={`/product/${product.product_id}`}
                            className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                        >
                            <div className="font-semibold">{product.product_name}</div>
                            <div className="text-sm text-gray-500">{product.product_category_name_english}</div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Cart & Become a Seller */}
            <div className="flex items-center gap-6">
                <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                    <FaShoppingCart size={24} />
                    {cartContext?.cart?.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                            {cartContext.cart.length}
                        </span>
                    )}
                </Link>
                <Link
                    to="/seller/register"
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-md font-semibold"
                >
                    Become a Seller
                </Link>

                {/* Profile Dropdown */}
                <div className="relative z-50" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                    >
                        {user?.customer_profile_pic ? (
                            <img
                                src={user.customer_profile_pic}
                                alt="Profile"
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <FaUserCircle size={30} />
                        )}
                        <MdArrowDropDown size={24} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-slate-200 border border-gray-300 rounded-md shadow-lg py-2 z-50">
                            <Link to="/myprofile" className="block px-4 py-2 hover:bg-gray-100">
                                My Profile
                            </Link>
                            <Link to="/my-orders" className="block px-4 py-2 hover:bg-gray-100">
                                My Orders
                            </Link>
                            <button
                                onClick={logout}
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;