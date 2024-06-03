sqlite-utils insert $ASSETS_DIR/pacoupa.db solutions_par_criteres $ASSETS_DIR/solutions_par_criteres_clean.csv --csv -d
sqlite-utils extract $ASSETS_DIR/pacoupa.db solutions_par_criteres CH ECS emetteur espace_exterieur_personnel env_contraint toiture_terrasse temperature nb_lgts niveau_renovation --table criteres
sqlite-utils convert $ASSETS_DIR/pacoupa.db solutions_par_criteres solution \
'bits = value.split("-")
return {
  "solutions_id": bits[0].strip(),
}' --multi

sqlite-utils transform $ASSETS_DIR/pacoupa.db solutions_par_criteres \
--not-null note_difficulte --not-null note_impact_travaux_coll --not-null note_impact_travaux_indiv --not-null note_cout \
--drop solution \
--drop usage_CH \
--drop usage_ECS \
--drop usage_FR \
--drop alertes \
-o criteres_id -o solutions_id -o ordre_solution

sqlite-utils add-foreign-key $ASSETS_DIR/pacoupa.db solutions_par_criteres solutions_id solutions id
