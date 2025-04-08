// app/src/features/scraper/scraper.logger.js

import logger from "../../utils/logger.js";

const logProductSuccess = (ref) => {
  logger.info(`[Produit extrait ✅] Référence ${ref} stockée`);
};

const logProductFailure = (ref) => {
  logger.warn(`[Produit non extrait ⚠️ ] Référence ${ref} inexistante`);
};

const logStart = (msg) => {
  logger.info(`[AUTH 🔐] Tentative de ${msg} au compte`);
};

const logEnd = () => {
  logger.info(`🏁 Extraction de données terminé avec succès`);
};

const logError = (ref, error) => {
  logger.error(`[Erreur ❌] Référence ${ref}`, error);
};

const logInfo = (context, msg) => {
  logger.info(`[${context}] ${msg}`);
};

const logWarn = (context, msg) => {
  logger.warn(`[${context}] ${msg}`);
};

const logSuccess = (context, msg) => {
  logger.info(`[${context} ✅] ${msg}`);
};

export default {
  logStart,
  logEnd,
  logProductSuccess,
  logProductFailure,
  logError,
  logInfo,
  logWarn,
  logSuccess,
};
