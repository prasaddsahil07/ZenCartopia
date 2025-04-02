import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ViewMore from "./pages/ViewMore";
import SearchResults from "./pages/SearchResult";
import CustomerProfilePage from "./pages/CustomerProfilePage";
import ShippingSummary from "./pages/ShippingSummary.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageProducts from "./pages/admin/ManageProducts.jsx";
import ManageSellers from "./pages/admin/ManageSellers.jsx";
import ManageOrders from "./pages/admin/ManageOrders.jsx";
import Analytics from "./pages/admin/Analytics.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/viewMore" element={<ViewMore />} />
            <Route path="/myprofile" element={<CustomerProfilePage />} />
            <Route path="/checkout" element={<ShippingSummary />} />
            <Route path="/my-orders" element={<MyOrders />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/sellers" element={<ManageSellers />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/analytics" element={<Analytics />} />
          </Routes>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
