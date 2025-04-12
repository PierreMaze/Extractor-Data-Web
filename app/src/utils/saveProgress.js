// app/src/utils/saveProgress.js

import fs from "fs";
import path from "path";
import config from "../config/app.config.js";
import logger from "./logger.js";

const backupPath = path.resolve(config.paths.exportDir, "backup.json");

/**
 * Sauvegarde temporaire des données scrapées dans un fichier JSON
 * sans stocker de doublons.
 *
 * @param {Array<object>} newData - Liste des nouvelles données à sauvegarder
 */
export const saveProgress = (newData) => {
  try {
    // Charger le backup existant s'il existe
    let currentData = [];
    if (fs.existsSync(backupPath)) {
      const data = fs.readFileSync(backupPath, "utf8");
      currentData = JSON.parse(data);
    }

    // Filtrer les nouveaux éléments qui ne seraient pas déjà présents
    // On se base ici sur la propriété "id". Adaptez la condition si nécessaire.
    const filteredNewData = newData.filter(
      (newItem) =>
        !currentData.some((existingItem) => existingItem.id === newItem.id)
    );

    if (filteredNewData.length === 0) {
      logger.info(
        "[FOUND 🆗] Aucun nouvel élément à ajouter, le backup est déjà à jour."
      );
      return;
    }

    // Fusionner les données existantes et les nouveaux éléments filtrés
    const mergedData = [...currentData, ...filteredNewData];

    // Sauvegarder le tableau mis à jour dans backup.json
    fs.writeFileSync(backupPath, JSON.stringify(mergedData, null, 2), "utf8");
    logger.info(`[CREATED ☑️ ] Progression sauvegardée dans ${backupPath}`);
  } catch (error) {
    logger.error("Erreur lors de la sauvegarde de la progression", error);
  }
};

/**
 * Charge les données sauvegardées, le cas échéant.
 *
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
