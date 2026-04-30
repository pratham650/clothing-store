const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { apiLimiter, authLimiter } = require("./middleware/rateLimiter"); 

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmet()); // Set security headers
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(mongoSanitize()); // Prevent NoSQL injection

// Rate limiting
app.use("/api", apiLimiter); // General API rate limit
app.use("/api/auth", authLimiter); // Strict auth rate limit

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes); // Admin routes for user management

// Base Route
app.get("/", (req, res) => {
  res.send("🚀 E-Commerce API Running");
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
