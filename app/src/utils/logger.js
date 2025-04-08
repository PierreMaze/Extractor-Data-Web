// app/src/utils/logger.js

import logger from "../config/winston.config.js";

const log = {
  info: (msg, meta = {}) => logger.info(msg, meta),
  warn: (msg, meta = {}) => logger.warn(msg, meta),
  error: (msg, meta = {}) => {
    if (meta instanceof Error) {
      logger.error(`${msg} | ${meta.message}`, { stack: meta.stack });
    } else {
      logger.error(msg, meta);
    }
  },
  debug: (msg, meta = {}) => logger.debug(msg, meta),
  verbose: (msg, meta = {}) => logger.verbose(msg, meta),

  logExecutionTime: async (label, asyncFn) => {
    const start = Date.now();
    log.debug(`🚀 Début : ${label}`);

    try {
      const result = await asyncFn();
      const duration = Date.now() - start;
      log.info(`✅ ${label} terminé en ${duration} ms`);
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      log.error(`❌ ${label} échoué après ${duration} ms`, error);
      throw error;
    }
  },
};

process.on("uncaughtException", (error) => {
  logger.error(`🚨 Exception non gérée : ${error.message}`, {
    stack: error.stack,
  });
});

process.on("unhandledRejection", (reason) => {
  logger.error(`🚨 Rejet non géré : ${reason}`);
});

export default log;
