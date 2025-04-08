// app/src/utils/chunker.js

/**
 * Divise un tableau en sous-tableaux (chunks) dont la taille est donnée.
 * @param {Array} array - Tableau à découper
 * @param {number} chunkSize - Taille maximale pour chaque sous-tableau
 * @returns {Array<Array>}
 */
export const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
