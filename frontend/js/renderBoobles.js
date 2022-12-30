/**
 * Function that returns a random number between a specified range.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} A random number between the specified range.
 */
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Handler for the 'DOMContentLoaded' event of the window. Creates a specified number of bubbles
 * and adds them to the element with class 'animation-boobles'.
 *
 * @listens window:DOMContentLoaded
 */
window.addEventListener("DOMContentLoaded", () => {
  // Gets the element with class 'animation-boobles'
  const container = document.querySelector(".animation-boobles");
  // Number of bubbles to create
  const numberBoobles = 50;
  // Minimum and maximum values for the '--i' attribute of each bubble
  const minValue = 10;
  const maxValue = 140;

  // Creates the bubbles and adds them to the container element
  for (let i = 0; i < numberBoobles; i++) {
    // Creates a div element with class 'booble'
    const booble = document.createElement("div");
    booble.setAttribute("class", "booble");
    // Assigns a random value between minValue and maxValue to the '--i' attribute of the bubble
    booble.setAttribute(
      "style",
      `--i: ${getRandomNumber(minValue, maxValue)};`
    );
    // Adds the bubble to the container element
    container.appendChild(booble);
  }
});
