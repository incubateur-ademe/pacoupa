sqlite-utils insert --empty-null $ASSETS_DIR/pacoupa.db cas_possibles $ASSETS_DIR/cas_possibles_clean.csv --csv -d

# réordonne les colonnes importantes en premier
sqlite-utils transform $ASSETS_DIR/pacoupa.db cas_possibles \
--pk id \
--not-null type_CH \
--not-null energie_CH \
--not-null type_ECS \
--not-null energie_ECS \
--not-null est_possible \



