// Cart.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const { cartItems = [], removeFromCart } = useCart();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const toggleSelection = (item) => {
    const key = `${item._id}-${item.size}-${item.color}`;
    const alreadySelected = selectedItems.find(
      (i) => `${i._id}-${i.size}-${i.color}` === key
    );

    if (alreadySelected) {
      setSelectedItems((prev) =>
        prev.filter((i) => `${i._id}-${i.size}-${i.color}` !== key)
      );
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  const handleBuySelected = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to buy!");
      return;
    }
    navigate("/buy", { state: { selectedItems } });
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 animate-slideIn">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-lg animate-scaleIn">
          Your cart is empty 😢
          <div className="mt-4">
            <Link
              to="/"
              className="inline-block bg-[#800000] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#a00000] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              🏠 Go to Home
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-slideIn"
            >
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedItems.some(
                    (i) =>
                      i._id === item._id &&
                      i.size === item.size &&
                      i.color === item.color
                  )}
                  onChange={() => toggleSelection(item)}
                />
                <img
                  src={item.image || `https://via.placeholder.com/600x600?text=Product+${item._id}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-500">
                    ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                  </p>
                  <p className="text-sm text-gray-400">
                    Size: {item.size} | Color: {item.color}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item._id, item.size, item.color)}
                className="px-3 py-1 bg-red-100 text-red-500 rounded-lg hover:bg-red-200 transition-all duration-300 transform hover:scale-110"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-semibold text-gray-800">
            Total: ₹{total}
          </div>

          <div className="flex justify-between mt-4">
            <Link
              to="/buy"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              🛒 Buy All
            </Link>
            <button
              onClick={handleBuySelected}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              ✅ Buy Selected
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
