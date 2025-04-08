// app/src/utils/parsePrice.js

/**
 * Transforme une chaîne contenant un prix en float.
 * Exemple : "123,45 €" → 123.45
 * @param {string} rawPrice
 * @returns {number|null}
 */
const parsePrice = (rawPrice) => {
  if (!rawPrice || typeof rawPrice !== 'string') return null;

  const sanitized = rawPrice.replace(/[^\d,\.]/g, '').replace(',', '.');
  const floatVal = parseFloat(sanitized);

  return isNaN(floatVal) ? null : floatVal;
};

export default parsePrice;
