sqlite-utils insert $ASSETS_DIR/pacoupa.db bdd_energie $ASSETS_DIR/bdd_energie_clean.csv --csv -d

# réordonne les colonnes importantes en premier
sqlite-utils transform $ASSETS_DIR/pacoupa.db bdd_energie \
--pk id \
--drop Annexe \
--drop usage_CH \
--drop usage_ECS \
--drop emetteur

sqlite-utils create-index pacoupa.db bdd_energie typologie
sqlite-utils create-index pacoupa.db bdd_energie zone_climatique
sqlite-utils create-index pacoupa.db bdd_energie scenario_renovation_systeme
sqlite-utils create-index pacoupa.db bdd_energie scenario_renovation_enveloppe
sqlite-utils create-index pacoupa.db bdd_energie ECS
sqlite-utils create-index pacoupa.db bdd_energie CH
