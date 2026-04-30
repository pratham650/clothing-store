import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Unisex from "./pages/Unisex";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Buy from "./pages/Buy";
import CupAndBottle from "./pages/CupAndBottle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import MyOrders from "./pages/MyOrders";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import MyAccount from "./pages/MyAccount";

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider> 
      <Navbar />
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/unisex" element={<Unisex />} />
        <Route
          path="/product/:id"
          element={<ProductDetails key={location.pathname} />}
        />
        <Route path="/category/bottles" element={<CupAndBottle />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute adminOnly={true}>
              <UserManagement />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/myaccount" 
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/myorders" 
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

export default App;
