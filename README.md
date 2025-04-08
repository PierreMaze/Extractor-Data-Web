# Scraper LPDB

## Objectif du Projet

Le but de ce projet est de scraper le site web **La Plateforme du Bâtiment (LPDB)** afin d'extraire des informations sur les produits du bâtiment depuis la réference dans l'url (https://www.laplateforme.com/catalogue/produit/[références]). Ces données seront ensuite stockées dans un fichier Excel sous le format suivant : **`Liste de produits LPDB DD-MM-YYYY.xlsx`**.

## Structure du Projet

Voici la structure du projet, avec les détails de chaque dossier et fichier :

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

## Dépendances et Installation

### Dépendances principales :

- **`puppeteer`** : Automatisation de la navigation web et du scraping des données.
- **`dotenv`** : Gestion des variables d'environnement.
- **`exceljs`** : Génération et manipulation des fichiers Excel.
- **`chalk`** : Coloration du texte dans les logs.

### Dépendances de développement :

- **`jest`** : Tests unitaires.
- **`eslint`** : Linting pour le code.
- **`prettier`** : Formatage automatique du code.

## Gestion des Erreurs

- **Try-Catch** : Chaque fichier intégrera des blocs `try-catch` pour capturer les erreurs et afficher des messages précis incluant le nom du fichier, la ligne et la fonction concernée.

- **Performance et Intégration** : Bien que nous utilisions cette méthode pour l'instant, le système est conçu pour permettre une intégration facile de gestionnaires d'erreurs plus performants à l'avenir.

## Structure des Fichiers

### Dossier `app/src/features/scraper/`

- **`scraper.config.js`** : Configuration générale pour le scraper.
- **`scraper.auth.js`** : Logique d'authentification pour se connecter au site.
- **`scraper.logger.js`** : Gestion des logs du scraper.
- **`scraper.products.js`** : Logique pour extraire les données des produits.
- **`scraper.test.js`** : Tests unitaires pour valider le bon fonctionnement du scraper.
- **`scraper.controller.js`** : Point d'entrée pour gérer le processus complet de scraping.

### Dossier `app/src/features/excel/`

- **`excel.generate.js`** : Génération du fichier Excel contenant les données extraites.
- **`excel.format.js`** : Formatage des données avant de les insérer dans le fichier Excel.
- **`excel.controller.js`** : Contrôleur pour coordonner l'exportation des données.

### Dossier `app/src/features/auth/`

- **`auth.config.js`** : Configuration pour l'authentification.
- **`auth.controller.js`** : Logique d'authentification.

### Dossier `app/src/config/`

- **`constante.js`** : Contient les constantes utilisées dans le projet.
- **`puppeteer.config.js`** : Configuration de Puppeteer pour l'automatisation.

### Dossier `app/src/utils/`

- **`delay.js`** : Fonction utilitaire pour créer des délais entre les actions.
- **`logger.js`** : Gestion des logs.
- **`formatData.js`** : Formatage des données.
- **`fetchHTML.js`** : Fonction pour récupérer le HTML d'une page.
- **`parsePrice.js`** : Fonction pour extraire et formater les prix.

### Dossier `app/src/logs/`

- **`scraper.log`** : Fichier contenant les logs du scraper.

## Authentification et Données à Scraper

### Authentification :

Le script doit tenter de se connecter automatiquement via la page d'accueil https://www.laplateforme.com/ lors de son exécution.

- **Si la connexion échoue** : La page s'affiche (url=https://www.laplateforme.com/) et attend l'intervention de l'utilisateur pour se connecter manuellement.

**Structure générale**: Un formulaire de connexion en deux étapes utilisant AngularJS (indiqué par les directives "ng-").

    <div class="login-form ng-scope" ng-controller="LoginFormController">
        <div class="login-form-title">Vous êtes pro <br>Connectez-vous</div>
        <form action="/users/login" method="post" novalidate="novalidate" class="step0 container ng-invalid ng-invalid-required ng-valid-maxlength">

            <!-- check is Authorize Action -->

                    <!-- Disabled -->

            <!-- end Authorize Action -->

            <!-- randomToken -->
            <input type="hidden" name="randomToken" value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZm9ybV90b2tlbiIsImlhdCI6MTc0MzY3Nzc4NywiZXhwIjoxNzQzNjg0OTg3fQ.GRcCBV3TmoohEwJ-uJZzCoNuQX2WiU1WI9nszZknv3E" autocomplete="off">
            <!-- ngIf: isChecking -->
            <div class="steps-wrapper">
                <div class="step-wrapper">
                    <div class="step-card-number">
                        <div class="form-item">
                            <label for="cardNumber">Numéro de carte</label>
                            <input type="text" name="cardNumber" id="cardNumber" maxlength="13" ng-model="card_number" required="" class="form-input ng-pristine ng-empty ng-invalid ng-invalid-required ng-valid-maxlength ng-touched" ng-keypress="onCardNumberKeypress($event, card_number)" spellcheck="false" data-ms-editor="true" style="">
                        </div>
                        <a href="/users/vous-avez-perdu-votre-carte" title="Cliquez ici si vous avez perdu votre carte.">Carte perdue ?</a>
                        <div class="form-action">
                            <button ng-click="onCardNumberSubmit(card_number)" ng-keydown="onCardNumberButtonKeydown($event)" ng-keyup="onCardNumberButtonKeyup($event, card_number)" ng-disabled="card_number.length < 13" class="pdb-btn btn-orange" type="button" disabled="disabled">
                                Suivant
                            </button>
                        </div>
                    </div>
                </div>
                <div class="step-wrapper">
                    <div class="step-password">
                        <button class="back-button" ng-click="onBackClick()" type="button">&lt; Retour</button>
                        <div class="form-item">
                            <label for="password">Mot de passe</label>
                            <!-- ngIf: step === 1 -->
                        </div>
                        <input type="hidden" name="backUrl" value="" autocomplete="off">
                        <input class="recaptchaToken" type="hidden" name="recaptchaToken" value="" data-site-key="6Lfg_eAUAAAAAO3YcLR33T1HRLNTqT_BawavwSOk" autocomplete="off">
                        <a href="/users/mot-de-passe-oublie" ng-click="forgottenPassword($event, card_number)" title="Cliquez ici si vous avez oublié votre mot de passe.">Oublié ?</a>
                        <div class="form-action">
                            <input type="submit" class="pdb-btn btn-orange" value="Se connecter">
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

**Première étape**: Saisie du numéro de carte

- Champ de texte limité à 13 caractères
- Bouton "Suivant" désactivé jusqu'à ce que 13 caractères soient saisis
- Lien "Carte perdue?" pour les utilisateurs ayant perdu leur carte

**Deuxième étape**: Saisie du mot de passe

- Bouton "Retour" pour revenir à l'étape précédente
- Champ de mot de passe (bien que le champ input ne soit pas visible dans ce code)
- Lien "Oublié?" pour réinitialiser le mot de passe
- Bouton "Se connecter" pour soumettre le formulaire

**Sécurité**:

- Token aléatoire caché (randomToken) avec un JWT
- Intégration reCAPTCHA (avec une clé de site visible)
- Validation côté client et serveur

**Navigation**: Le système est conçu pour que l'utilisateur remplisse d'abord son numéro de carte, puis passe à l'écran de mot de passe dans une expérience par étapes.

### Données à récupérer :

1. **Référence** (extrait depuis le lien produit).
2. **Titre** (extrait depuis la balise `<h1 id="title">`).
3. **Marque** (extrait depuis la balise appropriée).
4. **Prix** :
   Récupéré depuis la classe CSS `sub-price` en premier, s'il n'existe pas, récupérer depuis la classe CSS `main-price` (juste le float et sans le symbole Euro) puis converti en format FLOAT.
   - Si aucun prix n'est disponible, afficher `"Prix sur place."`.
5. **Conditionnement** (extrait de l'élément lié au `prix`, parès le `/`).
6. **Éco-participation** : (extrait de l'élément lié à `eco`).

_En cas de page innexistante ou produit inrtouvable_ :

- Si le titre <h1 id="title"> est égal à "Page introuvable", passez automatiquement à la référence suivante.

_En cas de doublon de données_ :

- Si la donnée est identique, elle est conservée.
- Si elle diffère, la donnée est écrasée et sauvegardée.

## Fichier Excel

Les données seront exportées dans un fichier Excel nommé selon la date d'extraction, sous le format :

**Nom du fichier :** `Liste de produits LPDB DD-MM-YYYY.xlsx`

Les données seront organisées dans une feuille Excel avec les colonnes suivantes :

## Format des colonnes

1. **Référence** : Lien cliquable.
2. **Titre** : Texte.
3. **Marque** : Texte.
4. **Prix** : FLOAT.
5. **Conditionnement** : Texte.
6. **Éco-participation** : FLOAT.

## Processus Automatisé (via `.exe`)

Un fichier **`Scraper-LPDB.exe`** sera fourni pour automatiser le processus de scraping, permettant à l'utilisateur de l'exécuter directement sans intervention manuelle via la lib "pkg". Ce fichier **.exe** :

- Exécutera le processus complet, depuis la connexion (si nécessaire) jusqu'à l'export des données.
- Les logs seront enregistrés dans le dossier `logs/` sous le fichier `scraper.log`.

## Environnement et Configuration

- **.env.local** : Utilisé pour les tests locaux.
- **.env.production** : Utilisé pour les environnements de production (scraping de 0 à 200 000 références).
- **.env.sample** : Exemple de fichier d'environnement pour la configuration.

## Tests et Qualité du Code

- **Tests unitaires** : Réalisés avec **jest** pour garantir la stabilité du scraper.
- **Linting et Formatage** : Assurés par **eslint** et **prettier**.

## Gestion des Logs

Les erreurs et événements importants seront enregistrés dans le fichier **`scraper.log`** pour une traçabilité complète et un débogage facilité.

## Procédure

1. **Lancement et Authentification**

   - **Démarrage** : Le programme se lance automatiquement.
   - **Connexion Automatique** : Il tente de s’identifier via la page d’accueil de [La Plateforme](https://www.laplateforme.com/) en utilisant un formulaire de connexion AngularJS préconfiguré avec les données d’authentification fournies dans le programme.
   - **Formulaire de Connexion** :
     ```html
     <div class="login-form ng-scope" ng-controller="LoginFormController">
       <div class="login-form-title">Vous êtes pro <br />Connectez-vous</div>
       <form
         action="/users/login"
         method="post"
         novalidate="novalidate"
         class="step0 container ng-invalid ng-invalid-required ng-valid-maxlength"></form>
     </div>
     ```
   - **Gestion des Échecs** :

     - Si la connexion automatique échoue, le programme affiche la page d’accueil et attend que l’utilisateur se connecte manuellement.
     - Une fois l’authentification établie manuellement, le programme reprend automatiquement le processus de scraping.
     - Afficher dans les logs "Le n° de [référence] n'existe pas".

   - **Gestion des Success** : s'il réussi à l'a trouver, affiche dans les logs "Le n° de [référence] à été trouvé et archivé".

2. **Collecte des Références Produits**

   - **Navigation vers le Catalogue** :  
     Après authentification, le programme accède au catalogue des produits en se rendant sur l’URL :
     ```
     https://www.laplateforme.com/catalogue/produit/[références]
     ```
     où `[références]` représente chaque identifiant de produit à scraper.
   - **Itération** :  
     Le programme parcourt la liste des références disponibles et prépare la collecte des données pour chaque produit.

3. **Extraction et Traitement des Données**

   - **Informations à Extraire** : Pour chaque produit, le programme récupère les informations suivantes :

     - **Référence** : Extraite depuis le lien produit et présentée sous forme de lien cliquable.
     - **Titre** : Extrait depuis la balise `<h1 id="title">`.
     - **Marque** : Extrait depuis l’élément approprié.
     - **Prix** :
       - Récupéré depuis la classe CSS `sub-price` en premier, s'il n'existe pas, récupérer depuis la classe CSS `main-price` (juste le float et sans le symbole Euro) puis converti en format FLOAT.
       - Si aucun prix n’est disponible, afficher `"Prix sur place."`
     - **Conditionnement** : Extrait de l’élément associé au prix (après le `/`), en format texte.
     - **Éco-participation** : Extrait et converti en format FLOAT.

   - **Vérification d’Erreur de Page** : Si le titre (`<h1 id="title">`) est égal à `"Page introuvable"`, le programme passe automatiquement à la référence suivante.

   - **Affichage des Echecs dans les logs** : s'il ne réussi pas à trouver la page, afficher dans les logs "Le n° de [référence] n'existe pas".

   - **Affichage des Success dans les logs** : s'il réussi à l'a trouver la page, affiche dans les logs "Le n° de [référence] à été trouvé et archivé".

   - **Gestion des Doublons** :
     - Si la donnée est identique à une précédente, elle est conservée.
     - Si elle diffère, la nouvelle donnée écrase l’ancienne et est sauvegardée.

4. **Exportation vers Excel**

   - **Format du Fichier** :  
     Les données extraites sont exportées dans un fichier Excel nommé selon la date d’extraction, au format :
     ```
     Liste de produits LPDB DD-MM-YYYY.xlsx
     ```
   - **Structure du Fichier Excel** :  
     La feuille Excel comporte les colonnes suivantes :
     - **Référence** : Nombre avec lien cliquable.
     - **Titre** : Texte.
     - **Marque** : Texte.
     - **Prix** : FLOAT.
     - **Conditionnement** : Texte.
     - **Éco-participation** : FLOAT.

5. **Gestion des Logs et des Erreurs**

   - **Traçabilité** :  
     Toutes les opérations et erreurs sont enregistrées dans le fichier `scraper.log`.
   - **Détails des Erreurs** :  
     Chaque erreur est loguée avec le nom du fichier, la ligne et la fonction concernée pour faciliter le débogage.

6. **Automatisation via l'Exécutable**
   - **Exécution Complète** :  
     Le processus complet – de l’authentification à l’exportation des données – peut être lancé via le fichier **`Scraper-LPDB.exe`**.
   - **Intervention Utilisateur** :  
     L’exécutable permet une exécution entièrement automatisée, sauf en cas d’échec de l’authentification, où une intervention manuelle est nécessaire pour se connecter.

## Conclusion

Le projet **Scraper LPDB** permet de récupérer efficacement des données sur les produits de **La Plateforme du Bâtiment**.  
Il est conçu pour être automatisé, facilement configurable et offre une gestion fine des erreurs, tout en respectant une architecture modulaire et performante.  
Les données extraites sont exportées dans un fichier Excel structuré, avec des mises à jour intelligentes en fonction des nouvelles informations.
