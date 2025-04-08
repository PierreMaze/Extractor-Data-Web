// app/src/features/excel/excel.generate.js

import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";
import config from "../../config/app.config.js";
import { getExcelColumns } from "./excel.format.js";

/**
 * Génère un fichier Excel avec les produits extraits.
 * @param {Array<object>} data - Liste des produits
 * @returns {Promise<string>} - Chemin du fichier généré
 */
const generateExcelFile = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Produits Website");

  const today = new Date();
  const dateString = today.toLocaleDateString("fr-FR").replace(/\//g, "-");
  const fileName = `Liste de produits WEBSITE ${dateString}.xlsx`;
  const outputPath = path.resolve(config.paths.exportDir, fileName);

  fs.mkdirSync(config.paths.exportDir, { recursive: true });

  sheet.columns = getExcelColumns();

  data.forEach((item) => {
    const row = sheet.addRow(item);
    const cell = row.getCell("reference");
    cell.value = {
      text: item.reference,
      hyperlink: `${config.urls.productUrl}${item.reference}`,
    };
  });

  await workbook.xlsx.writeFile(outputPath);
  return outputPath;
};

export default generateExcelFile;
