# PR Tracker Server

PR Tracker Server est une application backend développée avec Node.js et MongoDB, permettant de gérer les données des records personnels (PR) dans divers exercices de CrossFit. Ce serveur est conçu pour fonctionner avec le frontend de l'application PR Tracker, qui suit et affiche la progression des records personnels des utilisateurs dans leurs entraînements de CrossFit.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clonez le repository sur votre machine :

```ts
git clone https://github.com/GarciaaMarilia/pr-tracker-server.git
```

2. Accédez au répertoire du projet :

```ts
cd pr-tracker-server
```

3. Installez les dépendances avec npm :

```ts
npm install
```

## Configuration

Assurez-vous de créer un fichier .env à la racine de votre projet avec les variables suivantes :

```ts
PORT = 3000;
```

## Scripts

- `npm run dev`: Lance le serveur en mode développement avec `nodemon` et `ts-node`.

## Dépendances

- `bcryptjs`: Pour le chiffrement des mots de passe.
- `jsonwebtoken`: Pour la gestion des tokens d'authentification.
- `express`: Pour la création du serveur web.
- `mongoose`: Pour l'interaction avec MongoDB.
- `dotenv`: Pour charger les variables d'environnement.
