const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Import all product arrays
const menProducts = require("./data/menProducts");
const girlsProducts = require("./data/girlsProduct");
const botelProducts = require("./data/botelProduct");
const unisexProducts = require("./data/unisexProducts");
const cupProducts = require("./data/cupProduct");

// Seed Function
const seedData = async () => {
  try {
    await connectDB(); // ✅ Connect to MongoDB
    console.log("🛢️ MongoDB Connected");

    await Product.deleteMany(); // ❌ Delete old data
    console.log("🧹 Old product data deleted");

    // ✅ Merge all arrays into one
    const allProducts = [
      ...menProducts,
      ...girlsProducts,
      ...botelProducts,
      ...unisexProducts,
      ...cupProducts,
    ];

    // Optional debug log
    console.log("📦 Total products to insert:", allProducts.length);

    await Product.insertMany(allProducts); // ✅ Insert new data
    console.log("✅ Product data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
};

seedData();
