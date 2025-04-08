# Extractor Data Web

## Structure du Projet

Voici la structure du projet :

```plaintext
scraper_lpdb/                 # Dossier principal du projet
│
├── exports/                  # Dossier pour stocker les fichiers Excel générés
│   └── Liste de produits WEBSITE DD-MM-YYYY.xlsx
│
├── app/                      # Code source de l'application
│   ├── src/
│   │   ├── features/
│   │   │   ├── scraper/      # Dossier contenant les fichiers liés au scraping
│   │   │   │   ├── scraper.config.js
│   │   │   │   ├── scraper.auth.js
│   │   │   │   ├── scraper.logger.js
│   │   │   │   ├── scraper.products.js
│   │   │   │   ├── scraper.test.js
│   │   │   │   └── scraper.controller.js
│   │   │   │
│   │   │   ├── excel/        # Dossier pour la gestion des fichiers Excel
│   │   │   │   ├── excel.generate.js
│   │   │   │   ├── excel.format.js
│   │   │   │   └── excel.controller.js
│   │   │   │
│   │   │   └── auth/         # Dossier pour l'authentification
│   │   │       ├── auth.config.js
│   │   │       └── auth.controller.js
│   │   │
│   │   ├── config/           # Dossier de configuration générale
│   │   │   ├── app.config.js
│   │   │   ├── puppeteer.config.js
│   │   │   └── winston.config.js (futur fichier)
│   │   │
│   │   ├── utils/            # Dossier pour les utilitaires
│   │   │   ├── delay.js
│   │   │   ├── logger.js
│   │   │   ├── formatData.js
│   │   │   ├── fetchHTML.js
│   │   │   └── parsePrice.js
│   │   │
│   │   └──index.js           # Point d'entrée principal du projet
│   │
│   ├── logs/                 # Dossier pour les logs du scraper
│   │   └── scraper.log
│   │
│   ├── .env                  # Variables d'environnement pour le programme
│   ├── .env.sample           # Exemple des variables d'environnement pour le programme
│   └── package.json          # Fichier de configuration du projet Node.js (dans `app/`)
|
├─ README.md                  # Documentation du projet
└─ .gitignore                 # Fichier pour ignorer les fichiers non versionnés


```
