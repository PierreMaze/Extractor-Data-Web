// app/src/index.js

import runScraper from "./features/scraper/scraper.controller.js";
import exportToExcel from "./features/excel/excel.controller.js";
import logger from "./utils/logger.js";
import config from "./config/app.config.js";

logger.info("=== Lancement du programme ===");

const { start, end } = config.refRange;
const total = end - start + 1;
logger.info(`[LOAD ⚙️ ] Référence ${start} → ${end} (${total} produits)`);

const main = async () => {
  try {
    const productList = await runScraper();
    logger.info(
      `Extraction terminée. Nombre total de produits extraits : ${productList.length}`
    );

    await exportToExcel(productList);
  } catch (error) {
    logger.error("Erreur critique dans l'application", error);
  } finally {
    logger.info("=== Fin du programme ===");
  }
};

main();
