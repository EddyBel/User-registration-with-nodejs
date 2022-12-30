const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET } = require("../web.config");
const router = Router();

/**
 * @route GET /
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description Handles request to test the authentication API by returning a message
 */
router.get("/", (req, res, next) => {
  // Return message
  res.send("Test authentication api");
});

/**
 * @route GET /user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description Handles request to get user information by verifying the JWT token and returning the user data
 */
router.get("/user", async (req, res, next) => {
  // Get JWT token from request headers
  const token = req.headers["x-access-token"];

  if (!token) {
    // Return error if token is not present in request headers
    res.json({
      msg: "Access denied",
      auth: false,
    });
  }

  // Verify JWT token
  const decoded = jwt.verify(token, SECRET);

  // Find user by ID
  const user = await User.findById(decoded.id, { password: 0 });
  if (!user) {
    // Return error if user not found
    res.json({ msg: "User not found" });
  }

  // Return success response with user data
  res.json({ msg: "Success", user: user });
});

router.post("/test", (req, res, next) => {
  const body = req.body;
  // console.log(body);
  res.json({ msg: "Sussefull" });
});

module.exports = router;
