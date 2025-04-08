// app/src/features/scraper/scraper.controller.js

import config from "../../config/app.config.js";
import { launchBrowser } from "../../utils/fetchHTML.js";
import delay from "../../utils/delay.js";
import authenticate from "./scraper.auth.js";
import extractProductData from "./scraper.products.js";
import scraperLogger from "./scraper.logger.js";
import { ScraperConfig } from "./scraper.config.js";

/**
 * Lance le processus complet d'extraction de données de produits.
 * @returns {Promise<Array<object>>} Liste des produits extraits
 */
const runScraper = async () => {
  const { start, end } = config.refRange;

  try {
    const cookies = await authenticate();

    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setCookie(...cookies);

    const results = [];

    for (let ref = start; ref <= end; ref++) {
      const url = `${config.urls.productUrl}${ref}`;

      try {
        await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: config.puppeteer.timeout,
        });

        const data = await extractProductData(page, ref.toString());

        if (data) {
          results.push(data);
        }

        await delay(ScraperConfig.delayBetweenRequests);
      } catch (error) {
        scraperLogger.logError(ref, error);
        continue;
      }
    }

    scraperLogger.logEnd();
    await browser.close();
    return results;
  } catch (mainError) {
    scraperLogger.logError("GLOBAL", mainError);
    return [];
  }
};

export default runScraper;
