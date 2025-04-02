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
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from "./context/CartContext.jsx";
import ShippingSummary from "./pages/ShippingSummary.jsx";
import MyOrders from "./pages/MyOrders.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
        <Routes>
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
      </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
