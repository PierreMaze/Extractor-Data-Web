// app/src/utils/saveProgress.js

import fs from "fs";
import path from "path";
import config from "../config/app.config.js";
import logger from "./logger.js";

/**
 * Sauvegarde temporaire des données scrapées dans un fichier JSON.
 * @param {Array<object>} data
 */
export const saveProgress = (data) => {
  const backupPath = path.resolve(config.paths.exportDir, "backup.json");
  try {
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2), "utf8");
    logger.info(`Progression sauvegardée dans ${backupPath}`);
  } catch (error) {
    logger.error("Erreur lors de la sauvegarde de la progression", error);
  }
};

/**
 * Charge les données sauvegardées, le cas échéant.
 */
export const loadProgress = () => {
  const backupPath = path.resolve(config.paths.exportDir, "backup.json");
  if (fs.existsSync(backupPath)) {
    const data = JSON.parse(fs.readFileSync(backupPath, "utf8"));
    logger.info(`Progression chargée depuis ${backupPath}`);
    return data;
  }
  return [];
};
