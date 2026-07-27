const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  refreshToken,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/refresh", refreshToken);

// Protected routes
router.get("/me", isAuthenticatedUser, getUserProfile);
router.get("/profile", isAuthenticatedUser, getUserProfile);

module.exports = router;
