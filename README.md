# Extractor Data Web

## Structure du Projet

Voici la structure du projet :

```plaintext
Extractor-Data-Web/                 # Dossier principal du projet
│
├── exports/                  # Dossier pour stocker les fichiers Excel générés
│   └── Liste de produits WEBSITE DD-MM-YYYY.xlsx
│
├── app/                      # Code source de l'application
│   ├── src/
│   │   ├── config/           # Dossier de configuration générale
│   │   │   ├── app.config.js
│   │   │   ├── puppeteer.config.js
│   │   │   └── winston.config.js (futur fichier)
│   │   │
│   │   ├── features/
│   │   │   ├── auth/         # Dossier pour l'authentification
│   │   │   │   ├── auth.config.js
│   │   │   │   └── auth.controller.js
│   │   │   │
│   │   │   ├── excel/        # Dossier pour la gestion des fichiers Excel
│   │   │   │   ├── excel.exporter.js
│   │   │   │   ├── excel.format.js
│   │   │   │   └── excel.controller.js
│   │   │   │
│   │   │   └── scraper/      # Dossier contenant les fichiers liés au scraping
│   │   │       ├── scraper.config.js
│   │   │       ├── scraper.auth.js
│   │   │       ├── scraper.logger.js
│   │   │       ├── scraper.products.js
│   │   │       ├── scraper.test.js
│   │   │       └── scraper.controller.js
│   │   │
│   │   ├── logs/             # Dossier pour les logs du scraper
│   │   │   └── scraper.log
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
│   │
│   ├── .env                  # Variables d'environnement pour le programme
│   ├── .env.sample           # Exemple des variables d'environnement pour le programme
│   └── package.json          # Fichier de configuration du projet Node.js (dans `app/`)
|
├─ README.md                  # Documentation du projet
└─ .gitignore                 # Fichier pour ignorer les fichiers non versionnés


```
