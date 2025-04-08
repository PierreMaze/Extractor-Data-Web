// app/src/features/scraper/scraper.config.js

export const ScraperConfig = {
  delayBetweenRequests: 1500,
  retryAttempts: 2,
  logSuccessMessage: (ref) => `Le produit n°${ref} a été trouvé et archivé ✅`,
  logFailMessage: (ref) => `Le produit n°${ref} n'existe pas ❌`,
};
