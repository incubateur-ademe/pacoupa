sqlite-utils insert $ASSETS_DIR/pacoupa.db bdd_energie $ASSETS_DIR/bdd_energie_clean.csv --csv -d

# réordonne les colonnes importantes en premier
sqlite-utils transform $ASSETS_DIR/pacoupa.db bdd_energie \
--pk id \
--drop Annexe \
--drop usage_CH \
--drop usage_ECS \
--drop emetteur

