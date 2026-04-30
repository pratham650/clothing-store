import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

// Import product data
import menProducts from "../data/menProducts";
import girlsProduct from "../data/girlsProduct";
import cupProduct from "../data/cupProduct";
import botelProduct from "../data/botelProduct";
import unisexProducts from "../data/unisexProducts"; // ✅ Make sure this file exists

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("description");

  const clothingSizes = ["S", "M", "L", "XL"];
  const cupSizes = ["Small", "Medium", "Large"];
  const bottleSizes = ["250ml", "500ml", "1L"];

  const defaultColors = [
    "Black", "White", "Maroon", "Yellow", "Navy Blue", "Red", "Bottle Green", "Green"
  ];

  const colorMap = {
    "Black": "#000000",
    "White": "#FFFFFF",
    "Maroon": "#800000",
    "Yellow": "#FFD700",
    "Navy Blue": "#000080",
    "Red": "#FF0000",
    "Bottle Green": "#006A4E",
    "Green": "#008000"
  };

  const designOptions = ["Plain", "Printed", "Minimal", "Logo"];

  // 🛠 Fix for refresh and back issue
  useEffect(() => {
    setProduct(null); // Clear previous state first

    const allProducts = [
      ...menProducts,
      ...girlsProduct,
      ...cupProduct,
      ...botelProduct,
      ...unisexProducts
    ];

    const foundProduct = allProducts.find(item => item.id === parseInt(id));
    
    // Find similar products (same category, exclude current)
    if (foundProduct) {
      const similar = allProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setSimilarProducts(similar);
    }
    
    setTimeout(() => {
      setProduct(foundProduct);
    }, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  const isClothing = [
    ...menProducts,
    ...girlsProduct,
    ...unisexProducts
  ].some(p => p.id === product.id);

  const isCup = cupProduct.some(p => p.id === product.id);
  const isBottle = botelProduct.some(p => p.id === product.id);

  // Mock data for rating and reviews (you can later fetch from backend)
  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 128;
  const originalPrice = product.originalPrice || product.price * 1.3;
  const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
  
  const reviews = [
    { id: 1, name: "Rahul S.", rating: 5, comment: "Excellent quality! Totally worth it.", date: "Dec 20, 2024" },
    { id: 2, name: "Priya M.", rating: 4, comment: "Good product, fast delivery.", date: "Dec 18, 2024" },
    { id: 3, name: "Amit K.", rating: 5, comment: "Love the design and fit. Highly recommended!", date: "Dec 15, 2024" },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">({reviewCount} reviews)</span>
      </div>
    );
  };

  const handleAddToCart = () => {
    if (
      (isClothing && (!selectedSize || !selectedColor)) ||
      ((isCup || isBottle) && (!selectedSize || !selectedDesign))
    ) {
      alert("Please select all required options.");
      return;
    }

    const cartItem = {
      _id: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      color: selectedColor || null,
      design: selectedDesign || null,
      price: product.price,
    };

    addToCart(cartItem, selectedSize, selectedColor || selectedDesign);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleBuyNow = () => {
    // 🛡️ Check login before proceeding
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to continue with purchase.");
      navigate("/login");
      return;
    }

    // Do add to cart logic
    if (
      (isClothing && (!selectedSize || !selectedColor)) ||
      ((isCup || isBottle) && (!selectedSize || !selectedDesign))
    ) {
      alert("Please select all required options.");
      return;
    }

    const cartItem = {
      _id: product.id,
      name: product.name,
      image: product.image,
      size: selectedSize,
      color: selectedColor || null,
      design: selectedDesign || null,
      price: product.price,
      quantity: 1,
    };

    navigate("/buy", {
      state: {
        selectedItems: [cartItem],
      },
    });
  };

  return (
    <div className="bg-gradient-to-tr from-gray-50 via-white to-gray-100 min-h-screen py-12 px-4 font-[Inter] animate-fadeIn">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 bg-white rounded-3xl shadow-lg p-8 md:p-12 animate-scaleIn">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-3xl w-full h-[500px] object-cover shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {product.name}
          </h1>
          
          {/* Rating */}
          <div className="animate-slideIn">
            {renderStars(rating)}
          </div>
          
          <p className="text-lg text-gray-600">
            {isClothing
              ? "Soft fabric. Luxe fit. Crafted for all-day comfort."
              : "Premium material. Designed with care."}
          </p>
          
          {/* Price with Discount */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-emerald-600">₹ {product.price}</p>
            {discount > 0 && (
              <>
                <p className="text-xl text-gray-400 line-through">₹ {originalPrice.toFixed(0)}</p>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-gray-500">
            Brand:{" "}
            <span className="text-blue-600 font-semibold">
              {product.brand || "N/A"}
            </span>
          </p>

          {product.style && (
            <p className="text-gray-500">
              Style:{" "}
              <span className="text-purple-600 font-semibold">
                {product.style}
              </span>
            </p>
          )}

          {/* Size Selector */}
          {(isClothing || isCup || isBottle) && (
            <div>
              <label className="text-gray-700 font-medium mb-1 block">
                {isBottle ? "Select Quantity" : "Select Size"}
              </label>
              <div className="grid grid-cols-4 gap-3">
                {(isClothing ? clothingSizes : isCup ? cupSizes : bottleSizes).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-lg font-semibold border-2 transition-all duration-300 text-sm transform hover:scale-110 ${
                      selectedSize === size
                        ? "border-blue-600 text-blue-600 bg-blue-50 scale-105 shadow-md"
                        : "border-gray-300 text-gray-700 hover:border-blue-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selector */}
          {isClothing && (
            <div>
              <label className="text-gray-700 font-medium mb-1 block">
                Select Color
              </label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {defaultColors.map((color, index) => (
                  <div
                    key={`${color}-${index}`}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full border-2 cursor-pointer transition-all duration-300 shadow-sm transform hover:scale-125 ${
                      selectedColor === color
                        ? "ring-2 ring-blue-600 scale-110 shadow-lg"
                        : "hover:scale-105 border-gray-300"
                    }`}
                    style={{ backgroundColor: colorMap[color] || "#ccc" }}
                    title={color}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Design Selector */}
          {(isCup || isBottle) && (
            <div>
              <label className="text-gray-700 font-medium mb-1 block">
                Select Design
              </label>
              <div className="flex gap-3 flex-wrap">
                {designOptions.map((design) => (
                  <button
                    key={design}
                    onClick={() => setSelectedDesign(design)}
                    className={`px-4 py-2 rounded-xl border-2 font-medium transition-all duration-300 transform hover:scale-110 ${
                      selectedDesign === design
                        ? "border-purple-600 text-purple-600 bg-purple-50 scale-105 shadow-md"
                        : "border-gray-300 hover:border-purple-500 text-gray-700"
                    }`}
                  >
                    {design}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-xl font-semibold shadow-lg w-full sm:w-auto transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              {addedToCart ? "Added to Cart!" : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg rounded-xl font-semibold shadow-lg w-full sm:w-auto transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Buy Now
            </button>
          </div>

          {(selectedSize || selectedColor || selectedDesign) && (
            <p className="text-sm text-gray-500 mt-2">
              Selected:
              {selectedSize && ` ${selectedSize}`}
              {selectedColor && ` / ${selectedColor}`}
              {selectedDesign && ` / ${selectedDesign}`}
            </p>
          )}
        </div>
      </div>

      {/* Tabs Section - Reviews & Description */}
      <div className="max-w-6xl mx-auto mt-12 bg-white rounded-3xl shadow-lg p-8 animate-slideIn">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 font-semibold transition-all duration-300 ${
              activeTab === "description"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 font-semibold transition-all duration-300 ${
              activeTab === "reviews"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews ({reviewCount})
          </button>
        </div>

        {activeTab === "description" ? (
          <div className="prose max-w-none">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Product Details</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "High-quality product crafted with premium materials. Perfect for everyday use with exceptional durability and comfort. Available in multiple sizes and colors to suit your preference."}
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">✅ Features</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Premium quality material</li>
                  <li>Comfortable fit</li>
                  <li>Durable and long-lasting</li>
                  <li>Easy to care and maintain</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">🚚 Care Instructions</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Machine wash cold</li>
                  <li>Do not bleach</li>
                  <li>Tumble dry low</li>
                  <li>Iron on low heat</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Customer Reviews</h3>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-800">{rating}</span>
                  {renderStars(rating)}
                </div>
                <p className="text-sm text-gray-500 mt-1">Based on {reviewCount} reviews</p>
              </div>
            </div>

            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 animate-fadeIn">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600 mt-2">{review.comment}</p>
              </div>
            ))}

            <button className="w-full py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
              Write a Review
            </button>
          </div>
        )}
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="max-w-6xl mx-auto mt-12 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Similar Products You May Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="group block bg-white border rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-48 object-cover rounded-t-xl group-hover:opacity-90 transition-opacity"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                    {item.name}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-2">₹{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
