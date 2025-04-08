// app/src/features/scraper/scraper.auth.js

import config from "../../config/app.config.js";
import scraperLogger from "./scraper.logger.js";
import puppeteer from "puppeteer";
import readline from "readline";

const waitForUserInput = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("👉 Appuyez sur [Entrée] une fois connecté au site : ", () => {
      rl.close();
      resolve();
    });
  });
};

const authenticate = async () => {
  scraperLogger.logStart("Connexion automatique");
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    page = await browser.newPage();
    scraperLogger.logInfo("AUTO 🤖", "Navigation vers la page de connexion");
    await page.goto(config.urls.loginUrl, { waitUntil: "networkidle2" });

    scraperLogger.logInfo("AUTO 🤖", "Saisie du numéro de carte");
    await page.waitForSelector('input[name="cardNumber"]');
    await page.type('input[name="cardNumber"]', config.auth.user, {
      delay: 100,
    });

    scraperLogger.logInfo("AUTO 🤖", "Soumission du numéro de carte");
    await page.waitForSelector(
      'button[ng-click="onCardNumberSubmit(card_number)"]:not([disabled])'
    );
    await page.click('button[ng-click="onCardNumberSubmit(card_number)"]');

    scraperLogger.logInfo("AUTO 🤖", "Saisie du mot de passe");
    await page.waitForSelector('input[type="password"]', { timeout: 10000 });
    await page.type('input[type="password"]', config.auth.password, {
      delay: 100,
    });

    scraperLogger.logInfo("AUTO 🤖", "Soumission du formulaire de connexion");
    await page.click('input[type="submit"]');
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    const cookies = await page.cookies();

    if (!cookies || cookies.length === 0) {
      throw new Error("❌ Aucun cookie récupéré après connexion automatique.");
    }

    scraperLogger.logSuccess("AUTH", "Connexion automatique réussie");
    scraperLogger.logInfo(
      "START 🌐",
      "Démarrage de l'extraction de données..."
    );
    await browser.close();
    return cookies;
  } catch (error) {
    scraperLogger.logError("AUTH ❌", error);
    scraperLogger.logWarn(
      "AUTH 🔐",
      "Connexion automatique échouée, passage au mode manuel..."
    );
    if (browser) await browser.close();
  }

  scraperLogger.logStart("Connexion manuelle");
  scraperLogger.logInfo(
    "AUTH 🔐",
    "Veuillez vous connecter manuellement dans le navigateur ouvert."
  );

  browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });

  const pageManual = await browser.newPage();
  await pageManual.goto(config.urls.loginUrl, { waitUntil: "networkidle2" });

  await waitForUserInput();

  const manualCookies = await pageManual.cookies();
  await browser.close();

  if (!manualCookies || manualCookies.length === 0) {
    const manualError = new Error(
      "❌ Aucun cookie récupéré après connexion manuelle."
    );
    scraperLogger.logError("AUTH 🔐", manualError);
    throw manualError;
  }

  scraperLogger.logSuccess("AUTH", "Connexion manuelle réussie");
  scraperLogger.logInfo("START 🌐", "Démarrage de l'extraction de données...");
  return manualCookies;
};

export default authenticate;
