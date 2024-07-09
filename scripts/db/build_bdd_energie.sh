sqlite-utils insert $ASSETS_DIR/pacoupa.db bdd_energie $ASSETS_DIR/bdd_energie_clean.csv --csv -d

sqlite-utils transform $ASSETS_DIR/pacoupa.db bdd_energie \
--pk id \
--drop Annexe \
--drop usage_CH \
--drop usage_ECS \
--drop emetteur

# This index save a lot of time when querying the database and prevent to read a bunch of lines.
# Which is good because Turso have a free tiers for 1 billion of lines per month.
sqlite-utils create-index $ASSETS_DIR/pacoupa.db bdd_energie typologie ECS CH scenario_renovation_enveloppe scenario_renovation_systeme
