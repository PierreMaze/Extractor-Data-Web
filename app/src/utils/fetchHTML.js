// app/src/utils/fetchHTML.js

import puppeteer from "puppeteer";
import config from "../config/app.config.js";
import { PUPPETEER_CONFIG } from "../config/pupperteer.config.js";
import logger from "./logger.js";

export const launchBrowser = async () => {
  try {
    return await puppeteer.launch(PUPPETEER_CONFIG);
  } catch (error) {
    logger.error(`Erreur de lancement Puppeteer : ${error.message}`, error);
    throw error;
  }
};

export const fetchPage = async (browser, url) => {
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: config.puppeteer.timeout,
    });
    return page;
  } catch (error) {
    logger.error(`Erreur de chargement URL (${url}) : ${error.message}`, error);
    throw error;
  }
};
