sqlite-utils insert --empty-null $ASSETS_DIR/pacoupa.db typologies $ASSETS_DIR/typologies_clean.csv --csv -d

# réordonne les colonnes importantes en premier
sqlite-utils transform $ASSETS_DIR/pacoupa.db typologies \
--pk id \
--rename typologie nom \
--not-null nom \
--not-null surface_habitable \
--not-null etat_isolation_menuiseries \
--not-null surface_menuiseries \
--not-null etat_isolation_plancher_bas \
--not-null surface_plancher_bas \
--not-null etat_isolation_plancher_haut \
--not-null surface_plancher_haut \
--not-null etat_isolation_murs \
--not-null surface_murs \



