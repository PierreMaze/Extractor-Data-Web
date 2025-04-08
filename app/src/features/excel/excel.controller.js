// app/src/features/excel/excel.controller.js

import { exportMultipleExcelFiles } from "./excel.exporter.js";
import logger from "../../utils/logger.js";

/**
 * Exporte la liste complète des produits en plusieurs fichiers Excel.
 * Un fichier est généré dès que le seuil de 10 000 références est atteint.
 *
 * @param {Array<object>} productList - La liste complète des produits
 */
const exportToExcel = async (productList) => {
  if (!productList || productList.length === 0) {
    logger.warn("Aucune donnée à exporter.");
    return;
  }

  try {
    const fileNames = await exportMultipleExcelFiles(productList);
    if (fileNames.length === 0) {
      logger.warn("Aucun fichier Excel n'a été généré.");
    } else {
      fileNames.forEach((fileName) => {
        logger.info(`✅ Fichier Excel généré : ${fileName}`);
      });
    }
  } catch (error) {
    logger.error(
      `Erreur lors de l'exportation Excel : ${error.message}`,
      error
    );
  }
};

export default exportToExcel;
