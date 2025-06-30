# PACOUPA

**PACOUPA** permet aux copropriétaires de les informer sur l'installation de systèmes de chauffage décarbonés adaptés à leur logement et sur l'impact des rénovations globales ou intermédiaires.

A partir de quelques questions simples sur l’immeuble, l'outil permet de diriger les copropriétaires vers les solutions les plus pertinentes.

## Installation

### Récupérer la DB

Deux options : la construire, ou télécharger un dump de la production.

Pour la constuire, rendez-vous [plus bas](## Construction de la db).

Pour faire un dump :
1. connectez-vous à [Turso](https://app.turso.tech/login)
2. récupérez le nom de la base de données qui vous intéresse
3. de retour dans votre terminal, authentifiez vous avec `turso auth login`
4. [faites un dump](https://docs.turso.tech/cli/db/shell#database-dump) en lançant `turso db shell <database-name> .dump > dump.sql`
5. reconstruisez la db en lançant dans le dossier `assets` : `sqlite3 pacoupa.db < dump.sql`


### Lancer la db localement

Mettre à jour le fichier .env avec la variable TURSO_DATABASE_URL="http://127.0.0.1:8080".

```shell
# Lance la db SQLite en local.
turso dev --db-file assets/pacoupa.db 
```

### Lancer l'app en local

```shell
yarn install
yarn dev
open http://localhost:3000
```

### Lancer l'app en mode production

```shell
yarn install        
yarn start
yarn build
open http://localhost:3000
```

### Tester manuellement

Voici une URL de la page des résultats. 
Si elle s'affiche convenablement alors l'application et la db sont bien configurées.

```shell
open http://localhost:3000/simulation/resultat?hash=eyJhZHJlc3NlIjoiMyBSdWUgZGVzIExpc3NlcyAyODAwMCBDaGFydHJlcyIsImFubmVlIjoxOTcwLCJyZW5vdmF0aW9uIjpbXSwibmJMb2dlbWVudHMiOjMwLCJwb3NzZWRlRXNwYWNlc0V4dGVyaWV1cnNDb21tdW5zIjoiTm9uIiwicG9zc2VkZUVzcGFjZXNFeHRlcmlldXJzUGVyc29ubmVscyI6Ik91aSIsImVzcGFjZXNFeHRlcmlldXJzUGVyc29ubmVscyI6WyJiYWxjb24iXSwidHlwZUNIIjoiaW5kaXZpZHVlbCIsImVuZXJnaWVDSCI6ImdheiIsImVtZXR0ZXVyIjoicmFkaWF0ZXVycyIsInR5cGVFQ1MiOiJpbmRpdmlkdWVsIiwiZW5lcmdpZUVDUyI6ImdheiJ9&travauxNiveauIsolation=Global
```

## Construction de la db

Les données sont stockées dans une base SQLite `pacoupa.db`. 

Elle est construite à partir des fichiers CSV du répertoire `assets`. 

Les fichiers requis sont les suivants :
- bdd_eco_h1.csv
- bdd_eco_h2.csv
- bdd_eco_h3.csv
- bdd_energie_h1.csv
- bdd_energie_h2.csv
- bdd_energie_h3.csv
- solutions_par_criteres.csv
- solutions.csv
- typologies.csv

Ces fichiers CSV sont constitués à partir de fichier Excel/Google sheet stockés sur Google Drive dans le répertoire Pacoupa (demander l'accès).

1. Assurez-vous de bien avoir installé l'outil [sqlite-utils](https://sqlite-utils.datasette.io/en/stable/installation.html#using-homebrew)

2. Ouvrir le fichier `typologies PACOUPA`.
    - exporter l'onglet principal en le nommant `typologies.csv`.

3. Ouvrir le fichier `Simulateur 1 - PACOUPA`.
    - exporter l'onglet "Solutions par critères" en csv en le nommant `solutions_par_criteres.csv`.
    - exporter l'onglet "Catalogue de solutions" en le nommant `solutions.csv`.
    
4. Télécharger les fichier du Simulateur 2 les plus récents. Il y 3 fichiers bdd éco et bdd énergie (1 pour chaque zone géographique).
    - renommer les fichier csv bdd_energie (de la forme YYYYMMDD - Simulateur 2 - BDD Energie - Zone HX - PACOUPA.xlsx) en `bdd_energie_h1.csv`, `bdd_energie_h2.csv`, `bdd_energie_h3.csv`.
    - renommer les fichiers csv bdd_eco (de la forme YYYYMMDD - Simulateur 2 - BDD ECO - Zone HX - PACOUPA.xlsx) en `bdd_eco_h1.csv`, `bdd_eco_h2.csv`, `bdd_eco_h3.csv`.

5. Quand tous les fichiers requis sont présents dans `assets`, lancer le script de génération de la base SQLite.

```shell
yarn db:build
```

<details>
    <summary>Comment visualiser les data SQLite ?</summary>

    Pour visualiser les data, vous pouvez utiliser l'outil datasette.

    datasette assets/pacoupa.db

    Une technique pour s'assurer que le script de génération de la base s'est bien lancé, est de regarder la volumétrie attendue (ex: 120 000 lignes pour bdd_eco et bdd_energie).

</details>

<details>
    <summary>Sauvegarde des fichiers CSV</summary>

    Pour ne pas surcharger inutilement le repo GitHub Pacoupa, les fichiers CSV ne sont pas stockés (cf. .gitignore).

    Donc, à chaque fois qu'un fichier pacoupa.db est créé, et à minima, quand il est utilisé en production (cf. plus loin sur l'hébergement Turso), il est fortement conseillé de stocker l'ensemble des fichiers CSV dans un répertoire de backup sur le Drive de l'équipe. 
    
    Comme cela, à tout moment l'historique des fichiers sources qui ont permis de constituer une certaine version de la base SQLite est récupérable.
    
</details>

## Turso

En production, nous utilisons [Turso](https://turso.tech/) pour héberger les bases SQLite.


Prérequis: 
- installer le CLI Turso
- se créer un compte. 

Voir la [documentation officielle](https://docs.turso.tech/quickstart). 

Avant d'interagir avec Turso, il faut d'abord s'authentifier avec le compte *pacoupa.ademe* sur Turso.

```shell
turso auth login
```

Créer une db, suffixée avec la date du jour au format ISO.

```shell
turso db create pacoupa-20241022 --from-file assets/pacoupa.db
```

Un token d'accès est nécessaire afin de pouvoir lire la db.

Pour créer un nouveau token d'accès en lecture seule
```shell
turso db tokens create pacoupa-20241022 -r 
```

En développement, il faut recopier le token dans `.env` et `.env.local` (`TURSO_DATABASE_URL` et `TURSO_AUTH_TOKEN`).

En production sous Scalingo, il faudra ajouter/modifier ces variables d'environnement dans les settings.

<details>
    <summary>Comment supprimer une base Turso ?</summary>

    Ex: turso db destroy pacoupa-20240923.
</details>


### Génération du schéma Drizzle

Drizzle est un ORM/query builder typescript.

Il peut, par introspection, générer le schéma ORM et générer les types TS correspondants.

Prérequis : le fichier `.env` doit bien renseigner les variables `TURSO_DATABASE_URL` et `TURSO_AUTH_TOKEN`.


```shell
yarn dk:introspect
```

Cette commande va regénérer le fichier `schema.ts`.

À partir de ce schéma, les types TS peuvent être inférés. Pour maximiser leur utilité, nous devons retravailler `schema.ts` afin d'ajouter les enums qui représentent les domaines de valeur.

Modifier le fichier `drizzle/schema.ts` pour améliorer le typage des objets de persistence, en ajoutant les enums qui représentent les domaines de valeurs.

<details>
    <summary>Détails sur les types</summary>

    Grâce à cela, nous bénéficierons d'une autocomplétion parfaite. Par exemple, pour le champ `dpe`, nous aurons comme valeurs possibles `["A", "B", "C", "D", "E", "F", "G"]`. 
    
    Nous utilisons également drizzle-zod, qui permet d'inférer des schémas zod à partir du schéma Drizzle.

    Ex: 
        // zod-schema.ts
        import { createSelectSchema } from "drizzle-zod";
        import { type z } from "zod";
        import { bddEco, bddEnergie, criteres, typologies } from "./schema";

        export const criteresBatimentSchema = createSelectSchema(criteres);

    De cette façon, nous essayons autant que possible de ne pas se répéter tout en apportant le plus d'information au niveau des types.
</details>

Ceci sera utile pour construire les requêtes SQL et exploiter leurs résultats, ainsi qu'avoir une meilleure autocomplétion typescript.

Voir les enums déclarés dans `lib/common/domain/values`.

*Exemple*

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

Vous pouvez lancer la commande suivante pour vérifier que le code typescript compile correctement.

```shell
yarn tsc
```

### FAQ

*J'ai modifié la DB sur Turso et j'ai une erreur de déploiement sur Scalingo?*

Cela peut être dû au token d'accès qui a changé. 
Regénérer le token et le mettre à jour sur Scalingo.

*Comment ajouter une variable d'environnement ?*

L'ajouter dans `.env` pour l'utiliser et dans `.env.development` pour référence (commit dans Git).

Lancer le script `yarn generatedEnvDeclaration` pour modifier le scope global de `process.env` et profiter de l'autocomplétion.

## Déploiement

Le produit est déployé sur Scalingo dans l'organisation `incubateur-ademe`.

Pour modifier les variables d'environnement, aller sur le dashboard de Pacoupa.

Dans "Environnement", modifier les variables voulues. 

| APP_ENV | Branche Git | Fonction | URL |
| --- | --- | --- | --- | --- |
| prod | main | Site de production | https://pacoupa.ademe.fr/ |
| staging | dev | Site de préproduction | https://pacoupa.incubateur.ademe.dev/ |
| preview (défaut) | (feature branch) | Recette par PR | généré par Scalingo |
| dev | local | Développement | http://localhost:3000 |

