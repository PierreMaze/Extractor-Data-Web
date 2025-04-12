import ExcelJS from "exceljs";
import path from "path";
import config from "../../config/app.config.js";
import fs from "fs";
import { getExcelColumns } from "./excel.format.js";
import logger from "../../utils/logger.js";

/**
 * Génère un fichier Excel pour un ensemble de données.
 * @param {Array<object>} dataChunk - Produits à exporter
 * @param {number} startRef - Référence de départ (config.env)
 * @param {number} endRef - Référence de fin (config.env)
 * @returns {Promise<string>} - Chemin du fichier généré
 */
export const generateExcelFileForChunk = async (
  dataChunk,
  startRef,
  endRef
) => {
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

  const fileName = `Liste de produits ${startRef}-${endRef} ${dateString}.xlsx`;
  const outputPath = path.resolve(config.paths.exportDir, fileName);

  fs.mkdirSync(config.paths.exportDir, { recursive: true });
  await workbook.xlsx.writeFile(outputPath);

  return outputPath;
};

/**
 * Exporte la liste complète de produits en un ou plusieurs fichiers Excel.
 * @param {Array<object>} productList - Liste des produits
 * @returns {Promise<Array<string>>} - Chemins des fichiers générés
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
  const { start, end } = config.refRange;

  for (let i = 0; i < chunks.length; i++) {
    const fileName = await generateExcelFileForChunk(chunks[i], start, end);
    fileNames.push(fileName);
  }

  return fileNames;
};
