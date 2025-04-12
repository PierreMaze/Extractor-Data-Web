import fs from "fs";
import path from "path";
import runScraper from "./features/scraper/scraper.controller.js";
import exportToExcel from "./features/excel/excel.controller.js";
import { saveProgress, loadProgress } from "./utils/saveProgress.js";
import logger from "./utils/logger.js";
import config from "./config/app.config.js";
import { registerExitHandlers } from "./setup/exitHandlers.js";

logger.info("=== Lancement du programme ===");

// 📁 Supprimer le backup existant au lancement
const backupPath = path.resolve(config.paths.exportDir, "backup.json");

if (fs.existsSync(backupPath)) {
  try {
    fs.unlinkSync(backupPath);
    logger.info(`[RESET ♻️ ] JSON supprimé et re-créer au démarrage`);
  } catch (err) {
    logger.warn(
      `[SKIP ⚠️] Impossible de supprimer backup.json : ${err.message}`
    );
  }
}

// Détermination des références à scraper
const { start, end } = config.refRange;
const total = end - start + 1;
logger.info(`[LOAD ⚙️ ] Référence ${start} → ${end} (${total} produits)`);

// Chargement du backup (sera vide puisque supprimé juste avant)
let currentData = loadProgress();

// Gestionnaires de sortie (CTRL+C, erreurs)
registerExitHandlers(() => currentData);

const main = async () => {
  try {
    // 1. Scraping des produits
    const extractorData = await runScraper();

    // 2. Filtrage pour éviter les doublons
    const existingRefs = new Set(currentData.map((item) => item.reference));
    const filteredNewData = extractorData.filter(
      (item) => item.reference && !existingRefs.has(item.reference)
    );
    currentData = [...currentData, ...filteredNewData];
    if (currentData.length === 0) {
      logger.info("[SKIP 🟡] Aucun nouveau produit à ajouter au backup.");
    } else {
      logger.info(
        `[SAVE 🔄️] ${currentData.length} nouveaux produits trouvés `
      );
    }

    // 4. Export Excel
    await exportToExcel(currentData);
  } catch (error) {
    logger.error("Erreur critique dans l'application", error);
    saveProgress(currentData);
  } finally {
    logger.info(
      "[SAVE 🔄️] Démarrage de la sauvegarde des données dans un fichier JSON..."
    );
    saveProgress(currentData);
    logger.info("=== Fin du programme ===");
  }
};

main();
