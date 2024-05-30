cd $ASSETS_DIR

# Build solutions table

sqlite-utils insert pacoupa.db solutions solutions_clean.csv --csv -d

sqlite-utils convert pacoupa.db solutions num_solution \
'bits = value.split("-")
return {
  "id": bits[0].strip(),
  "nom": bits[1].strip(),
}' --multi

# réordonne les colonnes importantes en premier
sqlite-utils transform pacoupa.db solutions \
--pk id \
--drop num_solution \
-o id -o nom -o famille_solution -o type -o usage_CH -o usage_ECS -o usage_FR \
-o note_impact_visuel -o note_impact_sonore -o note_impact_espace_exterieur -o note_environnemental -o note_maturite \
--not-null nom --not-null famille_solution --not-null type --not-null usage_CH --not-null usage_ECS --not-null usage_FR \
--not-null note_impact_visuel --not-null note_impact_sonore --not-null note_impact_espace_exterieur --not-null note_environnemental --not-null note_maturite \
# --drop commentaire_app \
# --drop commentaire_pouget \
# --drop num_AFPAC \
# --drop emprise_PAC_exterieur \
# --drop local_technique \
# --drop emprise_logement \
# --drop structure \
# --drop acoustique \
# --drop reseaux_hydrauliques \
# --drop PLU \
# --drop raccordement_electrique \
# --drop impact_visuel \


