import runScraper from "./features/scraper/scraper.controller.js";
import exportToExcel from "./features/excel/excel.controller.js";
import { saveProgress, loadProgress } from "./utils/saveProgress.js";
import logger from "./utils/logger.js";
import config from "./config/app.config.js";
import { registerExitHandlers } from "./setup/exitHandlers.js";

logger.info("=== Lancement du programme ===");

// Détermination des références à scraper
const { start, end } = config.refRange;
const total = end - start + 1;
logger.info(`[LOAD ⚙️ ] Référence ${start} → ${end} (${total} produits)`);

// Charge le backup existant (doublons éliminés lors de la sauvegarde)
let currentData = loadProgress();

// Enregistre les gestionnaires d'arrêt (SIGINT et uncaughtException)
registerExitHandlers(() => currentData);

const main = async () => {
  try {
    // Exécute le scraping
    const extractorData = await runScraper();
    // Fusionne les données existantes avec les nouvelles données
    currentData = [...currentData, ...extractorData];
    logger.info(
      `[BACKUP ℹ️ ] Nombre total de produits extraits : ${currentData.length}`
    );
    // Export Excel normal
    await exportToExcel(currentData);
  } catch (error) {
    logger.error("Erreur critique dans l'application", error);
    saveProgress(currentData);
  } finally {
    logger.info("[SAVE 🔄️] Démarrage de la sauvegarde finale des données...");
    saveProgress(currentData);
    logger.info("=== Fin du programme ===");
  }
};

main();
