// app/src/features/auth/auth.controller.js

import authenticate from "../scraper/scraper.auth.js";

/**
 * Appelle l'authentification via le scraper.
 * @param {import('puppeteer').Page} page
 */
const handleAuth = async (page) => {
  await authenticate(page);
};

export default handleAuth;
