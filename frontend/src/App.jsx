import { Navigate, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { useCart } from "./context/CartContext";

// Pages
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import CartPage from "./pages/CartPage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ViewMore from "./pages/ViewMore";
import SearchResults from "./pages/SearchResult";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import ShippingSummary from "./pages/ShippingSummary";
import MyOrders from "./pages/MyOrders";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  const { user, checkAuth, checkingAuth } = useAuth();
  const { fetchCart } = useCart();
  const [initialized, setInitialized] = useState(false);

  // Only check auth once on mount
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setInitialized(true);
      }
    };
    
    if (!initialized) {
      verifyAuth();
    }
  }, [initialized]);

  // Fetch cart only when user changes and is logged in
  useEffect(() => {
    if (user && initialized) {
      fetchCart();
    }
  }, [user, initialized]);

  if (checkingAuth || !initialized) {
    console.log("Loading...");
    return;
    
  }

  return (
    <div>
      <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <LogInPage /> : <Navigate to="/" />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/viewMore" element={<ViewMore />} />

            {/* Authenticated User Routes */}
            <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
            <Route path="/myprofile" element={user ? <CustomerProfilePage /> : <Navigate to="/login" />} />
            <Route path="/checkout" element={user ? <ShippingSummary /> : <Navigate to="/login" />} />
            <Route path="/my-orders" element={user ? <MyOrders /> : <Navigate to="/login" />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={user?.customer_role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
            />
          </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;