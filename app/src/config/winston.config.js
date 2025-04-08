// app/src/config/winston.config.js

import winston from "winston";
import path from "path";
import fs from "fs";
import config from "./app.config.js";

fs.mkdirSync(config.paths.logDir, { recursive: true });

const logFilePath = path.resolve(config.paths.logDir, "scraper.log");

const customFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: config.general.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    customFormat
  ),
  transports: [new winston.transports.File({ filename: logFilePath })],
});

if (config.general.nodeEnv !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), customFormat),
    })
  );
}

export default logger;
