// app/src/index.js

import runScraper from "./features/scraper/scraper.controller.js";
import exportToExcel from "./features/excel/excel.controller.js";
import { saveProgress, loadProgress } from "./utils/saveProgress.js";
import logger from "./utils/logger.js";
import config from "./config/app.config.js";

logger.info("=== Lancement du programme ===");

// Détermination des références à scraper en fonction de l'environnement
const { start, end } = config.refRange;
const total = end - start + 1;
logger.info(`[LOAD ⚙️ ] Référence ${start} → ${end} (${total} produits)`);

// Variable globale pour cumuler les données extraites
let currentData = loadProgress(); // Si un backup existe, on le charge

// Gestion des interruptions pour sauvegarder l'état en cas d'arrêt brutal

// Pour une interruption via CTRL+C (SIGINT)
process.on("SIGINT 🚫", () => {
  logger.error(
    "Interruption SIGINT détectée, sauvegarde des données d'urgence..."
  );
  saveProgress(currentData);
  process.exit(1);
});

const main = async () => {
  try {
    // Exécute le scraping
    const extratorData = await runScraper();
    // Fusionne les données existantes avec les nouvelles (pour reprendre si un backup existait)
    currentData = [...currentData, ...extratorData];
    logger.info(
      `[BACKUP ℹ️ ] Nombre total de produits extraits : ${currentData.length}`
    );

    // Export en Excel
    await exportToExcel(currentData);
  } catch (error) {
    logger.error("Erreur critique dans l'application", error);
    // Sauvegarde en cas d'erreur
    saveProgress(currentData);
  } finally {
    logger.info("[SAVE 🔄️] Démarrage de la sauvegarde finale des données...");
    saveProgress(currentData);
    logger.info("=== Fin du programme ===");
  }
};

main();
