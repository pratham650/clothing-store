const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  verifyUser,
  deleteUser,
  toggleAdminStatus,
} = require("../controllers/adminController");

const router = express.Router();

// All routes are protected and admin-only
router.get("/users", protect, admin, getAllUsers);
router.put("/users/verify/:id", protect, admin, verifyUser);
router.delete("/users/:id", protect, admin, deleteUser);
router.put("/users/toggle-admin/:id", protect, admin, toggleAdminStatus);

module.exports = router;
