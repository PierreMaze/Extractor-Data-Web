// app/src/utils/delay.js

/**
 * Pause le programme pendant un nombre de millisecondes.
 * @param {number} ms - Durée de la pause en millisecondes
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default delay;
