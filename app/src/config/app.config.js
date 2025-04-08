// app/src/config/app.config.js

import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = fs.existsSync(path.resolve(__dirname, "../../.env"))
  ? path.resolve(__dirname, "../../.env")
  : ".env";

dotenv.config({ path: envPath });

const config = {
  general: {
    nodeEnv: process.env.NODE_ENV || "development",
    logLevel: process.env.LOG_LEVEL || "info",
  },
  urls: {
    productUrl: process.env.WEBSITE_PRODUCT_URL,
    loginUrl: process.env.WEBSITE_LOGIN_URL,
  },
  auth: {
    user: process.env.WEBSITE_USER,
    password: process.env.WEBSITE_PASSWORD,
  },
  puppeteer: {
    headless: process.env.HEADLESS === "true",
    timeout: parseInt(process.env.TIMEOUT, 10) || 30000,
  },
  paths: {
    exportDir:
      process.env.EXPORT_DIR || path.resolve(__dirname, "../../../exports"),
    logDir: process.env.LOG_DIR || path.resolve(__dirname, "../logs"),
  },
  scraper: {
    prodStartRef: parseInt(process.env.SCRAPER_PROD_START_REF, 10) || 75000,
    prodEndRef: parseInt(process.env.SCRAPER_PROD_END_REF, 10) || 180000,
    testStartRef: parseInt(process.env.SCRAPER_TEST_START_REF, 10) || 1,
    testEndRef: parseInt(process.env.SCRAPER_TEST_END_REF, 10) || 150528,
  },
  export: {
    chunkSize: parseInt(process.env.EXPORT_CHUNK_SIZE, 10) || 10000,
  },
  flags: {
    forceManualAuth: process.env.FORCE_MANUAL_AUTH === "true",
  },
  get refRange() {
    const isProd = this.general.nodeEnv === "production";
    return {
      start: isProd ? this.scraper.prodStartRef : this.scraper.testStartRef,
      end: isProd ? this.scraper.prodEndRef : this.scraper.testEndRef,
    };
  },
};

export default config;
