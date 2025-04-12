// app/src/utils/excelChecker.js
import fs from "fs";
import path from "path";
import ExcelJS from "exceljs";
import config from "../config/app.config.js";
import logger from "./logger.js";

/**
 * Récupère toutes les références déjà présentes dans les fichiers Excel.
 * @returns {Promise<Set<string>>}
 */
export const getExistingProductReferences = async () => {
  const exportDir = config.paths.exportDir;
  const existingReferences = new Set();

  let files = [];
  try {
    files = fs.readdirSync(exportDir).filter((file) => file.endsWith(".xlsx"));
  } catch (err) {
    logger.warn("Dossier d'export inaccessible ou inexistant.");
    return existingReferences;
  }

  for (const file of files) {
    const filePath = path.join(exportDir, file);
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet("Produits");

      if (!worksheet) {
        logger.warn(`Feuille "Produits" non trouvée dans ${file}`);
        continue;
      }

      // 📌 Recherche dynamique de la colonne avec header "Référence"
      const headerRow = worksheet.getRow(1);
      let refColIndex = -1;

      headerRow.eachCell((cell, colNumber) => {
        if (
          typeof cell.value === "string" &&
          cell.value.trim().toLowerCase() === "référence"
        ) {
          refColIndex = colNumber;
        }
      });

      if (refColIndex === -1) {
        logger.warn(`Colonne "Référence" non trouvée dans ${file}`);
        continue;
      }

      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return; // Ignore l'en-tête

        const cell = row.getCell(refColIndex);
        const ref =
          typeof cell.value === "object" && cell.value.text
            ? cell.value.text
            : cell.value;

        if (ref) {
          existingReferences.add(ref.toString());
        }
      });
    } catch (err) {
      logger.error(`Erreur lecture fichier Excel ${file} : ${err.message}`);
    }
  }

  return existingReferences;
};
