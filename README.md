# PACOUPA

**PACOUPA** a pour but d'outiller les copropriétaires dans l'installation de systèmes de chauffage décarbonés adaptés à leur logement.

A partir de quelques questions simples sur l’immeuble, l'outil permet de diriger les copropriétaires vers les solutions les plus pertinentes.

## Installation et lancement local
```bash
yarn install
yarn dev
open http://localhost:3000
```


## Build 

```bash
yarn build
```

---
<a href="https://vercel.com/?utm_source=ademe&utm_campaign=oss" alt="Url Vercel"><image src="https://user-images.githubusercontent.com/37937348/161967395-a5064a6a-b4d3-4ede-a940-ad81fa773916.svg" alt="Vercel" width="100" /></a>


## Persistence

Les données sont stockées dans une DB SQLite hébergée sur Turso.

En cas de modification du fichier Google sheet original, il faut :
- exporter en csv les données du simulateur
    - le premier onglet, en le nommant solution_par_cas.csv
    - le second, en le nommant solutions.csv
- stocker ces 2 fichiers dans le répertoire assets
- lancer le script /scripts/db/build_db.sh 
```shell
./scripts/db/build_db.sh
```
- lancer la génération du schéma Drizzle
```shell
❯ yarn drizzle-kit introspect:sqlite
```

