// app/src/features/excel/excel.controller.js
import { exportMultipleExcelFiles } from "./excel.exporter.js";
import logger from "../../utils/logger.js";
import { getExistingProductReferences } from "../../utils/excelChecker.js";

/**
 * Exporte les produits sans doublons en vérifiant la colonne "reference"
 * @param {Array<object>} productList
 */
const exportToExcel = async (productList) => {
  if (!productList || productList.length === 0) {
    logger.warn("Aucune donnée à exporter.");
    return;
  }

  try {
    const existingRefs = await getExistingProductReferences();

    const newProducts = productList.filter((product) => {
      if (!product.reference) return false;
      return !existingRefs.has(product.reference.toString());
    });

    if (newProducts.length === 0) {
      logger.info(
        "[DUPLICATE 🆗] Aucun nouveau produit à importer qui n'est pas similaire aux données existantes dans le fichier Excel généré."
      );
      return;
    }

    const fileNames = await exportMultipleExcelFiles(newProducts);
    fileNames.forEach((fileName) => {
      logger.info(`[CREATED ☑️ ] Fichier Excel généré : ${fileName}`);
    });
  } catch (err) {
    logger.error(`Erreur export Excel : ${err.message}`, err);
  }
};

export default exportToExcel;
