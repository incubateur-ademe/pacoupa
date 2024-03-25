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
❯ yarn dk-introspect
```
NB: Vérifier que son fichier `.env` contient bien les variables TURSO_DATABASE_URL et TURSO_AUTH_TOKEN.
Cela va regénérer le fichier schema.ts qui permettra d'écrire ses requêtes SQL de manière typesafe.


### FAQ

*J'ai modifié la DB sur Turso et j'ai une erreur de déploiement sur Vercel?*

Cela peut être dû au token d'accès qui a changé. 
Regénérer le token et le mettre à jour sur Vercel.


### Schéma DB

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
class sqlite_master {
   text type
   text name
   text tbl_name
   int rootpage
   text sql
}

solutions_par_cas  -->  caracteristiques : caracteristiques_id:id
solutions_par_cas  -->  solutions : id_solution:id

