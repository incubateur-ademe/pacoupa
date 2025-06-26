sqlite-utils insert $ASSETS_DIR/pacoupa.db bdd_energie $ASSETS_DIR/bdd_energie_h1_clean.csv --csv --delimiter=";"
sqlite-utils insert $ASSETS_DIR/pacoupa.db bdd_energie $ASSETS_DIR/bdd_energie_h2_clean.csv --csv --delimiter=";"
sqlite-utils insert $ASSETS_DIR/pacoupa.db bdd_energie $ASSETS_DIR/bdd_energie_h3_clean.csv --csv --delimiter=";"

sqlite-utils transform $ASSETS_DIR/pacoupa.db bdd_energie \
--pk id \
--drop Annexe \
--drop usage_CH \
--drop usage_ECS \
--drop emetteur \
--drop sortie_passoire_energetique \
--not-null zone_climatique \
--not-null typologie \
--not-null etat_isolation_menuiseries \
--not-null etat_isolation_plancher_bas \
--not-null etat_isolation_plancher_haut \
--not-null etat_isolation_murs \
--not-null scenario_renovation_enveloppe \
--not-null etat_isolation_menuiseries_apres_scenario_renovation_enveloppe \
--not-null etat_isolation_plancher_bas_apres_scenario_renovation_enveloppe \
--not-null etat_isolation_plancher_haut_apres_scenario_renovation_enveloppe \
--not-null etat_isolation_murs_apres_scenario_renovation_enveloppe \
--not-null type_CH \
--not-null type_ECS \
--not-null CH \
--not-null ECS \
--not-null scenario_renovation_systeme \
--not-null CEP \
--not-null GES \
--not-null DPE \
--not-null gain_energetique_% \
--not-null etiquette_dpe_initiale

# This index save a lot of time when querying the database and prevent to read a bunch of lines.
# Which is good because Turso have a free tiers for 1 billion of lines per month.
sqlite-utils create-index $ASSETS_DIR/pacoupa.db bdd_energie typologie ECS CH scenario_renovation_enveloppe scenario_renovation_systeme
