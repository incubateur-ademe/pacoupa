# PACOUPA

**PACOUPA** a pour but d'outiller les copropriétaires dans l'installation de systèmes de chauffage décarbonés adaptés à leur logement.

A partir de quelques questions simples sur l’immeuble, l'outil permet de diriger les copropriétaires vers les solutions les plus pertinentes.

## Installation et lancement local

Mettre à jour le fichier .env avec la variable TURSO_DATABASE_URL="http://127.0.0.1:8080".

```bash
turso dev --db-file assets/pacoupa.db 

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

1. Création de la DB SQLite

En cas de modification du fichier Google sheet original, il faut :
- exporter en csv les données du simulateur
    - le premier onglet, en le nommant solutions_par_criteres.csv
    - le second, en le nommant solutions.csv
- stocker ces 2 fichiers dans le répertoire assets
- lancer le script /scripts/db/build_db.sh 

```shell
./scripts/db/build_db.sh
```

2. Push sur Turso

Il faut auparavant s'authentifier avec `turso auth login`.

```shell
turso db destroy pacoupa
turso db create pacoupa --from-file assets/pacoupa.db
turso db tokens create pacoupa -r # création d'un token d'accès en lecture seule
```

Recopier le token dans .env et .env.local.
Il faudra aussi le  noter sur Vercel settings.

3. Génération du schéma types Drizzle

D'abord, vérifier son fichier `.env` renseignant les variables TURSO_DATABASE_URL et TURSO_AUTH_TOKEN.

```shell
yarn dk-introspect
```

Cette commande va regénérer le fichier schema.ts et les types Drizzle.

### FAQ

*J'ai modifié la DB sur Turso et j'ai une erreur de déploiement sur Vercel?*

Cela peut être dû au token d'accès qui a changé. 
Regénérer le token et le mettre à jour sur Vercel.


### Schéma DB


```mermaid
classDiagram
direction BT

class caracteristiques {
   text CH
   text ECS
   text emetteur
   text espace_exterieur
   text env_contraint
   text toiture_terrasse
   text temperature
   text nb_lgts
   text niveau_renovation
   integer id
}
class solutions {
   text name
   text type
   text usage_CH
   text usage_ECS
   text usage_FR
   text num_AFPAC
   text emprise_PAC_exterieur
   text local_technique
   text emprise_logement
   text structure
   text acoustique
   text reseaux_hydrauliques
   text PLU
   text raccordement_electrique
   text impact_visuel
   text note_impact_visuel
   text note_Impact_sonore
   text note_impact_espace_exterieur
   text note_environnemental
   text note_maturite
   text commentaire_app
   text commentaire_pouget
   text id
}
class solutions_par_cas {
   integer caracteristiques_id
   text id_solution
   integer ordre_solution
   text difficulte
   text impact_travaux_coll
   text impact_travaux_indiv
   text cout
   text type_solution
   text usage_CH
   text usage_ECS
   text usage_FR
   integer alertes
}


solutions_par_cas  -->  solutions : id_solution

solutions_par_cas  -->  caracteristiques : caracteristiques_id
```
