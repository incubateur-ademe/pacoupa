# PACOUPA

**PACOUPA** permet aux copropriétaires de les informer sur l'installation de systèmes de chauffage décarbonés adaptés à leur logement et sur l'impact des rénovations globales ou intermédiaires.

A partir de quelques questions simples sur l’immeuble, l'outil permet de diriger les copropriétaires vers les solutions les plus pertinentes.

## Installation

### Lancement de la db locale

Mettre à jour le fichier .env avec la variable TURSO_DATABASE_URL="http://127.0.0.1:8080".

```shell
# Lance la db SQLite en local.
turso dev --db-file assets/pacoupa.db 
```

### Lancement de l'app en développement

```shell
yarn install
yarn dev
open http://localhost:3000
```

### Lancement de l'app en mode production pour la CI/CD

```shell
yarn install        
yarn start
yarn build
open http://localhost:3000
```

### Test manuel

Voici une URL de la page des résultats. 
Si elle s'affiche convenablement, alors l'application et la db sont bien configurées.

```shell
open http://localhost:3000/simulation/resultat?hash=eyJhZHJlc3NlIjoiMyBSdWUgZGVzIExpc3NlcyAyODAwMCBDaGFydHJlcyIsImFubmVlIjoxOTcwLCJyZW5vdmF0aW9uIjpbXSwibmJMb2dlbWVudHMiOjMwLCJwb3NzZWRlRXNwYWNlc0V4dGVyaWV1cnNDb21tdW5zIjoiTm9uIiwicG9zc2VkZUVzcGFjZXNFeHRlcmlldXJzUGVyc29ubmVscyI6Ik91aSIsImVzcGFjZXNFeHRlcmlldXJzUGVyc29ubmVscyI6WyJiYWxjb24iXSwidHlwZUNIIjoiaW5kaXZpZHVlbCIsImVuZXJnaWVDSCI6ImdheiIsImVtZXR0ZXVyIjoicmFkaWF0ZXVycyIsInR5cGVFQ1MiOiJpbmRpdmlkdWVsIiwiZW5lcmdpZUVDUyI6ImdheiJ9&travauxNiveauIsolation=Global
```

## Construction de la db

Les données sont stockées dans une DB SQLite.

La db pacoupa.db peut être reconstruite à partir des fichiers stockés sur Google Drive.

Télécharger tous les fichiers du simulateur 1 et 2 dans le répertoire `assets`.

1. Rassembler les fichiers csv : 
    1. Ouvrir le fichier `Simulateur 1 - PACOUPA`.
        - exporter en csv le premier onglet en le nommant `solutions_par_criteres.csv`.
        - exporter le second en le nommant `solutions.csv`.
        
    2. Télécharger les fichier du Simulateur 2 les plus récents. 
        - renommer les fichier csv bdd_energie en `bdd_energie_h1.csv`, `bdd_energie_h2.csv`, `bdd_energie_h3.csv`.
        - renommer les fichiers csv bdd_eco en `bdd_eco_h1.csv`, `bdd_eco_h2.csv`, `bdd_eco_h3.csv`.

    3. Ouvrir le fichier `typologies PACOUPA`.
        - exporter l'onglet principal en le nommant `typologies.csv`.

2. Lancer le script `yarn db:build`

<details>
    <summary>Note sur la sauvegarde des fichiers CSV</summary>

    À chaque fois qu'un fichier pacoupa.db est créé, et à minima, quand il est utilisé en production (cf. plus loin sur l'hébergement Turso), il est conseillé de stocker l'ensemble des fichiers csv dans le répertoire `PACOUPA/Backup csv/[YYYYMMDD]` afin de pouvoir à tout moment de retrouver les fichiers sources ou bien de reconstituer le fichier SQLite.
    
</details>

## Turso

Turso permet d'héberger des bases SQLite.

Il faut d'abord s'authentifier.

```shell
 turso auth login
```

Créer une db, suffixée avec la date du jour au format ISO.

```shell
turso db create pacoupa-20240923 --from-file assets/pacoupa.db
```

Un token d'accès est nécessaire afin de pouvoir lire la db.

Pour créer un nouveau token d'accès en lecture seule
```shell
turso db tokens create pacoupa-20240923 -r 
```

En développement, il faut recopier le token dans `.env` et `.env.local` (`TURSO_DATABASE_URL` et `TURSO_AUTH_TOKEN`).

En production sous Vercel, il faudra ajouter/modifier ces variables d'environnement dans les settings.

> [!Tip]  
> Pour supprimer une base `turso db destroy pacoupa`

### Génération du schéma Drizzle

Drizzle est un ORM/query builder typescript.

Il peut, par introspection, générer le schéma ORM et générer les types correspondants.

Prérequis : le fichier `.env` doit bien renseigner les variables `TURSO_DATABASE_URL` et `TURSO_AUTH_TOKEN`.


```shell
yarn dk:introspect
```

Cette commande va regénérer le fichier schema.ts et les types Drizzle.

Modifier le fichier drizzle/schema.ts pour améliorer le typage des objets de persistence, en ajoutant les enums qui représentent les domaines de valeurs. 

Ceci sera utile ensuit pour construire les requêtes SQL et exploiter leurs résultats, ainsi qu'avoir une meilleure autocomplétion typescript.

Exemple

```js
export const solutions = sqliteTable("solutions", {
  id: text("id", { enum: enumIdSolution }).primaryKey(),
  nom: text("nom").notNull(),
  familleSolution: text("famille_solution", { enum: enumFamille }).notNull(),
  type: text("type", { enum: enumType }).notNull(),
  typeSysteme: text("type_systeme", { enum: enumTypeSysteme }).notNull(),
  ...
}

```

Vous pouvez lancer la compilation typescript pour vérifier que le code est typesafe.

```shell
yarn tsc
```

### FAQ

*J'ai modifié la DB sur Turso et j'ai une erreur de déploiement sur Vercel?*

Cela peut être dû au token d'accès qui a changé. 
Regénérer le token et le mettre à jour sur Vercel.

## Déploiement

Le produit est déployé sur Vercel.

| PACOUPA_ENV | Terminologie Vercel | Branche Git | Fonction | URL |
| --- | --- | --- | --- | --- |
| prod | Production | main | Site de production | https://pacoupa.ademe.fr/ |
| preprod | Preview | dev | Site de préproduction | https://pacoupa.ademe.vercel.app/ |
| dev (défaut) | Development | (feature branch) | Recette par PR |  |
