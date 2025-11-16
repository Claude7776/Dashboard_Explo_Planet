# Data_ChallengeNASA  
ChallengeNASA2025

[![Docker Hub](https://img.shields.io/docker/pulls/ton-utilisateur/ton-image?label=Docker%20Hub&logo=docker)](https://hub.docker.com/r/ton-utilisateur/ton-image)

## 🌌 NASA Exoplanets Simplified Dataset

Bienvenue dans ce projet dédié à l'exploration des **exoplanètes** découvertes par la NASA ! 🚀  

Ce dépôt contient une version **simplifiée et prête à explorer** du dataset officiel du [NASA Exoplanet Archive](http://exoplanetarchive.ipac.caltech.edu).

---

## 📂 Contenu du dépôt

- `exoplanets_simplified.csv` : CSV avec les colonnes principales suivantes :
  - `pl_name` : Nom de la planète  
  - `hostname` : Nom de l'étoile hôte  
  - `disc_year` : Année de découverte  
  - `discoverymethod` : Méthode de découverte  
  - `pl_orbper` : Période orbitale (jours)  
  - `pl_rade` : Rayon de la planète (Rayons terrestres)  
  - `pl_bmasse` : Masse de la planète (Masses terrestres)  
  - `pl_eqt` : Température d'équilibre (K)  
  - `st_teff` : Température de l'étoile (K)  
  - `st_rad` : Rayon de l'étoile (Rayons solaires)  
  - `st_mass` : Masse de l'étoile (Masses solaires)  

- `static/` : fichiers CSS, JS, images et logo  
- `template/index.html` : page HTML principale du dashboard  
- `app.py` : serveur Flask minimal pour servir le dashboard  
- `Dockerfile` : image Docker pour exécuter l'application  
- `docker-compose.yml` : orchestration complète avec réseau 
host    
- `requirements.txt` : dépendances Python

---

## ⚡ Objectif

- Fournir un fichier CSV **propre et léger** pour une analyse rapide.  
- Permettre une exploration facile avec **Python**, **Excel**, **LibreOffice**, ou directement dans le terminal avec `csvkit`.  
- Offrir une **interface web interactive** pour comparer les planètes et visualiser leurs caractéristiques.

---

## 🚀 Exemple d'utilisation

### Dans le terminal
```bash
# Affiche le CSV sous forme de tableau lisible
csvlook exoplanets_simplified.csv
```

```bash
# Filtrer les exoplanètes découvertes après 2020
csvgrep -c disc_year -r "202[1-9]" exoplanets_simplified.csv
```

### 🌌 Dashboard Interactif
Ce projet inclut un dashboard web interactif pour explorer les exoplanètes de manière visuelle et intuitive.

Fonctionnalités :
  -Comparaison Terre vs exoplanètes candidates

  -Visualisation graphique des caractéristiques planétaires

  -Filtres par année, masse, rayon, température, etc.

  -Export CSV des données affichées

  -Responsive design pour desktop et mobile

  ## 🧰 Technologies utilisées
  -HTML / CSS /

  -Flask pour le serveur web

  -Gunicorn pour le déploiement en production

  -Docker & Docker Compose pour l’environnement conteneurisé

  -csvkit / Miller pour l’analyse rapide en ligne de commande

## 🐳 Déploiement avec Docker
  1. Construire et lancer l’application

  ```bash 
    docker-compose up --build
  ```
  **L’application sera disponible sur http://localhost:8000**

  2. Structure du projet

  ```bash
NASA_challenge/
├── app.py
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── requirements.txt
├── deploy.sh
├── LICENSE
├── README.md
├── Dataset/
│   ├── exoplanets_simplified.csv
│   └── list_planet_habitable.txt
├── static/
│   ├── css/
│   │   ├── component.css
│   │   ├── layout.css
│   │   └── theme.css
│   └── logo/
│       └── logo.png
└── template/
    └── dashboard.html
    ```
  --------------
  ## 🧪 Tests & Débogage

  1. **Accès aux logs :**

  ```bash
    docker-compose logs -f web
  ```

  2. **Verifier l'état du conteneur**
  ```bash
    docker ps
  ```

  ## 🖼️ Aperçu du Dashboard

Voici une capture d’écran du **Dashboard des Planètes Habitables** :

![Dashboard NASA Challenge](/capture/Capture%20d’écran_2025-11-15_23-44-54.png)

## 📈 Prochaines améliorations

  ``-Intégration de données en temps réel (API NASA)``

  ``-Ajout de filtres avancés (habitabilité, distance, etc.)``

  ``-Authentification utilisateur pour sauvegarder des favoris``

  ``-Export PDF ou PNG des graphiques``

