const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * @typedef {Object} User
 * @property {string} username - The username of the user
 * @property {string} email - The email of the user
 * @property {string} password - The hashed password of the user
 */
const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

/**
 * @param {string} password - The password to encrypt
 * @returns {Promise<string>} A promise that resolves with the encrypted password
 * @description Encrypts the provided password using bcrypt
 */
UserSchema.methods.encryptPassword = async (password) => {
  // Generate salt
  const salt = await bcrypt.genSalt(10);

  // Hash password with salt
  return bcrypt.hash(password, salt);
};

/**
 * @param {string} password - The password to validate
 * @returns {Promise<boolean>} A promise that resolves with a boolean indicating whether the provided password is valid
 * @description Validates the provided password by comparing it to the hashed password of the user instance
 */
UserSchema.methods.validatePassword = function (password) {
  // Compare provided password to hashed password
  return bcrypt.compare(password, this.password);
};

module.exports = model("User", UserSchema);
