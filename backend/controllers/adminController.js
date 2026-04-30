const User = require("../models/User");

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Verify a user manually (Admin only)
exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: "User verified successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error verifying user", error: error.message });
  }
};

// Delete a user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isAdmin) {
      return res.status(400).json({ message: "Cannot delete admin accounts" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// Toggle admin status (Admin only)
exports.toggleAdminStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAdmin = !user.isAdmin;
    await user.save();

    res.json({ 
      message: `User ${user.isAdmin ? "promoted to" : "demoted from"} admin`, 
      user 
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};
