const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validateValues } = require("../utils/validations");
const { SECRET, DEV_TIME } = require("../web.config");

const router = Router();

/**
 * @route POST /signup
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description Handles user signup by creating a new user and generating a JWT token
 */
router.post("/signup", async (req, res, next) => {
  // Destructure request body variables
  const { username, email, password } = req.body;
  // Validate input values
  const valid = validateValues(username, email, password).valid;

  if (valid) {
    // Create new user instance
    const user = new User({
      username: username,
      email: email,
      password: password,
    });

    // Encrypt password and save user to database
    user.password = await user.encryptPassword(user.password);
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: DEV_TIME,
    });

    // Return success response with token
    res.json({ msg: "Successfully signed up", auth: true, token: token });
  } else {
    // Return error response if input values are invalid
    res.json({ msg: "Error signing up", auth: false, token: null });
  }
});

/**
 * @route POST /login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @description Handles user login by finding the user and generating a JWT token
 */
router.post("/login", async (req, res, next) => {
  // Destructure request body variables
  const { email, password } = req.body;

  // Validate input values
  const valid = validateValues(email, password);

  if (valid) {
    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      // Return error if user not found
      res.status(401).json({
        msg: "User by email not found",
        auth: false,
      });
    }

    // Validate password
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      // Return error if password is invalid
      res.json({ msg: "Password not found" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: DEV_TIME,
    });

    // Return success response with token
    res.json({ msg: "Successfully logged in", token: token });
  } else {
    // Return error if input values are invalid
    res.status(401).json({ msg: "Error logging in", auth: false, token: null });
  }
});

module.exports = router;
