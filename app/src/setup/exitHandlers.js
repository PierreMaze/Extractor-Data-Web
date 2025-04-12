import { saveProgress } from "../utils/saveProgress.js";
import { generateExcelFileForChunk } from "../features/excel/excel.exporter.js";
import logger from "../utils/logger.js";

/**
 * Enregistre les gestionnaires d'arrêt du programme.
 * @param {Function} getCurrentData - Callback retournant les données courantes à sauvegarder.
 */
export function registerExitHandlers(getCurrentData) {
  // Gestion de SIGINT (CTRL+C)
  process.on("SIGINT", () => {
    logger.warn("[STOP 🛑] Interruption SIGINT détectée.");
    // Affichage du message de prompt (sans attendre d'input)
    logger.info("Terminer le programme de commandes (O/N) ?");
    // Lancer volontairement une erreur pour simuler l'absence de réponse
    throw new Error("answer is not defined");
  });

  // Gestion des erreurs non capturées (uncaughtException)
  process.on("uncaughtException", async (error) => {
    logger.error("🚨 Exception non gérée : " + error.message);
    logger.info("[SAVE 🔄️] Démarrage de la sauvegarde finale des données...");
    saveProgress(getCurrentData());
    // Génération du fichier Excel d'urgence
    const emergencyPath = await generateExcelFileForChunk(getCurrentData(), 1);
    logger.info(
      `[EMERGENCY 🆘] Fichier Excel d'urgence généré : ${emergencyPath}`
    );
    logger.info("=== Fin du programme ===");
    process.exit(1);
  });
}
