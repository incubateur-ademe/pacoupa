sqlite-utils insert $ASSETS_DIR/pacoupa.db bdd_cout $ASSETS_DIR/bdd_cout_clean.csv --csv -d

sqlite-utils transform $ASSETS_DIR/pacoupa.db bdd_cout \
--pk id \
--drop etat_menuiseries \
--drop etat_isolation_plancher_bas \
--drop etat_isolation_plancher_haut \
--drop etat_isolation_murs \
--drop emetteur \
--drop usage_CH \
--drop usage_ECS \
--drop Annexe \
--drop Electricite \
--drop Gaz \
--drop Fioul \
--drop Eclairage \
--drop Auxilliaires \

# This index save a lot of time when querying the database and prevent to read a bunch of lines.
# Which is good because Turso have a free tiers for 1 billion of lines per month.
sqlite-utils create-index $ASSETS_DIR/pacoupa.db bdd_cout typologie ECS CH scenario_renovation_enveloppe scenario_renovation_systeme

