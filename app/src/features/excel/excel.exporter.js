// app/src/features/excel/excel.exporter.js

import ExcelJS from "exceljs";
import path from "path";
import config from "../../config/app.config.js";
import fs from "fs";
import { getExcelColumns } from "./excel.format.js";
import logger from "../../utils/logger.js";

/**
 * Génère un fichier Excel pour un ensemble de données (chunk).
 * @param {Array<object>} dataChunk - Sous-ensemble de produits
 * @param {number} partNumber - Numéro de la partie (commence à 1)
 * @returns {Promise<string>} - Chemin du fichier généré
 */
export const generateExcelFileForChunk = async (dataChunk, partNumber) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Produits");

  sheet.columns = getExcelColumns();

  dataChunk.forEach((item) => {
    const row = sheet.addRow(item);

    row.getCell("Source").value = "LPDB";

    const cell = row.getCell("reference");
    cell.value = {
      text: item.reference,
      hyperlink: `${config.urls.productUrl}${item.reference}`,
    };
  });

  const today = new Date();
  const dateString = today.toLocaleDateString("fr-FR").replace(/\//g, "-");

  const fileName = `Liste de produits partie n°${partNumber} ${dateString}.xlsx`;
  const outputPath = path.resolve(config.paths.exportDir, fileName);

  fs.mkdirSync(config.paths.exportDir, { recursive: true });

  await workbook.xlsx.writeFile(outputPath);
  return outputPath;
};

/**
 * Exporte la liste complète de produits en plusieurs fichiers Excel,
 * un fichier pour chaque chunk de données.
 * @param {Array<object>} productList
 * @returns {Promise<Array<string>>} - Liste des chemins des fichiers générés
 */
export const exportMultipleExcelFiles = async (productList) => {
  if (!productList || productList.length === 0) {
    logger.warn(
      "Aucune donnée à exporter. Aucun fichier Excel ne sera généré."
    );
    return [];
  }

  const chunkSize = config.export.chunkSize;
  const chunks = [];
  for (let i = 0; i < productList.length; i += chunkSize) {
    chunks.push(productList.slice(i, i + chunkSize));
  }

  const fileNames = [];
  for (let i = 0; i < chunks.length; i++) {
    const fileName = await generateExcelFileForChunk(chunks[i], i + 1);
    fileNames.push(fileName);
  }
  return fileNames;
};
