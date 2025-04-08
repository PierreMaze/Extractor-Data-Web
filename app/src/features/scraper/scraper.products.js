// app/src/features/scraper/scraper.products.js

import parsePrice from "../../utils/parsePrice.js";
import scraperLogger from "./scraper.logger.js";

/**
 * Essaie de récupérer la marque à partir de différentes structures HTML.
 */
const extractBrand = async (page) => {
  return await page.evaluate(() => {
    // Tenter d'abord de récupérer la balise <a> dans la dernière ligne du tableau
    const brandLink = document.querySelector("table tr:last-child td a");
    if (brandLink) {
      return brandLink.textContent.trim();
    }
    // Si la balise <a> n'existe pas, récupérer le contenu du <td> parent
    const brandCell = document.querySelector(
      "table tr:last-child td:last-child"
    );
    return brandCell ? brandCell.textContent.trim() : null;
  });
};

/**
 * Récupère les informations d’un produit depuis la page fournie.
 * @param {import('puppeteer').Page} page
 * @param {string} ref
 * @returns {Promise<object|null>}
 */
const extractProductData = async (page, ref) => {
  try {
    const title = await page.$eval("#title", (el) => el.textContent.trim());

    if (title === "Page introuvable") {
      scraperLogger.logProductFailure(ref);
      return null;
    }

    const brand = await extractBrand(page);

    let priceText = await page
      .$eval(".sub-price", (el) => el.textContent)
      .catch(() =>
        page.$eval(".main-price", (el) => el.textContent).catch(() => null)
      );
    const price = parsePrice(priceText);
    const packaging = priceText?.split("/")?.[1]?.trim() ?? null;

    scraperLogger.logProductSuccess(ref);

    return {
      reference: ref,
      title,
      brand,
      price,
      packaging,
    };
  } catch (error) {
    scraperLogger.logError(ref, error);
    return null;
  }
};

export default extractProductData;
