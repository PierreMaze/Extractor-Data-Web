// app/src/utils/saveProgress.js

import fs from "fs";
import path from "path";
import config from "../config/app.config.js";
import logger from "./logger.js";

const backupPath = path.resolve(config.paths.exportDir, "backup.json");

/**
 * Sauvegarde temporaire des données scrapées dans un fichier JSON.
 * @param {Array<object>} data - Liste des données à sauvegarder
 */
export const saveProgress = (data) => {
  try {
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2), "utf8");
    logger.info(`[SAVE 🔄️] Progression sauvegardée dans ${backupPath}`);
  } catch (error) {
    logger.error("Erreur lors de la sauvegarde de la progression", error);
  }
};

/**
 * Charge les données sauvegardées, le cas échéant.
 * @returns {Array<object>} La liste sauvegardée ou un tableau vide.
 */
export const loadProgress = () => {
  if (fs.existsSync(backupPath)) {
    try {
      const data = fs.readFileSync(backupPath, "utf8");
      const jsonData = JSON.parse(data);
      logger.info(`[LOAD ⚙️ ] Progression chargée depuis ${backupPath}`);
      return jsonData;
    } catch (error) {
      logger.error("Erreur lors du chargement de la progression", error);
      return [];
    }
  }
  return [];
};
