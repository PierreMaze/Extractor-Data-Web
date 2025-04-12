// app/src/utils/formatData.js

/**
 * Formate un objet produit pour s'assurer qu'il est bien structuré.
 * @param {object} data - Données extraites d'un produit
 * @returns {object} Données nettoyées et prêtes à exporter
 */
const formatProductData = (data) => {
  return {
    reference: String(data.reference ?? "").trim(),
    title: data.title?.trim() || "Titre inconnu",
    brand: data.brand?.trim() || "Non précisé",
    price: typeof data.price === "number" ? data.price : null,
    packaging: data.packaging?.trim() || "",
    ecoParticipation:
      typeof data.ecoParticipation === "number" ? data.ecoParticipation : null,
  };
};

/**
 * Formate une liste complète de produits.
 * @param {Array<object>} productList
 * @returns {Array<object>} Liste nettoyée
 */
const formatAllProducts = (productList = []) => {
  return productList.map(formatProductData);
};

export { formatProductData, formatAllProducts };
