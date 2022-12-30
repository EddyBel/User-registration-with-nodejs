/**
 * @param {...string} params - The values to validate
 * @returns {Object} An object with a 'valid' field indicating the validity of the values and a 'value' field indicating the first invalid value
 * @description Validates the provided values to ensure they are non-empty strings
 */
const validateValues = (...params) => {
  // Loop through each value
  for (const param of params) {
    // Return invalid object if value is null, not a string, or consists only of whitespace
    if (param == null || typeof param !== "string" || !param.trim()) {
      return { valid: false, value: param };
    }
  }

  // Return valid object if all values are valid
  return { valid: true };
};

module.exports = {
  validateValues,
};
