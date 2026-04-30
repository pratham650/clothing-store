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

// Trust proxy (important for Railway)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS - must be before other middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Parse JSON bodies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// MongoDB Sanitize - DISABLED temporarily for Railway compatibility
// Will be re-enabled after confirming Express version works
// app.use(mongoSanitize());

// Rate limiting
app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

// Base Route
app.get("/", (req, res) => {
  res.status(200).json({ 
    message: "🚀 E-Commerce API Running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Test route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    database: "connected",
    environment: process.env.NODE_ENV || "development"
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
});

module.exports = app;
