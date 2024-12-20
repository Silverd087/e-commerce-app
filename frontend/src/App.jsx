import { useState } from "react";
import Navbar from "./Components/common/layout/Navbar";
import Footer from "./Components/common/layout/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/common/Home";
import Checkout from "./pages/common/payment/Checkout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductPage from "./pages/common/products/ProductPage";
import SignIn from "./pages/common/Auth/SignIn";
import SignUp from "./pages/common/Auth/SignUp";
import Profile from "./pages/common/Auth/Profile";
import Products from "./pages/common/products/Products";
import { CartProvider } from "./Context/CartContext";
import PrivateRoute from "./Components/common/Auth/PrivateRoute";

function AppContent() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname === "/admin";

  return (
    <div className="h-full flex flex-col bg-[#EFF3F6]">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<Products />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        {/* Wrap the whole app in CartProvider */}
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;
