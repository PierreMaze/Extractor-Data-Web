// app/src/config/puppeteer.config.js
import config from "./app.config.js";

export const PUPPETEER_CONFIG = {
  headless: config.puppeteer.headless,
  timeout: config.puppeteer.timeout,
  defaultViewport: null,
  args: [
    "--disable-setuid-sandbox",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
  ],
};
