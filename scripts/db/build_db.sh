cd $(dirname $0)
cd ../../assets/

rm pacoupa.db

# Prevent encoding issues

iconv -f utf-8 -t utf-8 -c solutions.csv > solutions_clean.csv
iconv -f utf-8 -t utf-8 -c solutions_par_criteres.csv > solutions_par_criteres_clean.csv

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
-o note_impact_visuel -o note_Impact_sonore -o note_impact_espace_exterieur -o note_environnemental -o note_maturite \
--not-null nom --not-null famille_solution --not-null type --not-null usage_CH --not-null usage_ECS --not-null usage_FR \
--not-null note_impact_visuel --not-null note_Impact_sonore --not-null note_impact_espace_exterieur --not-null note_environnemental --not-null note_maturite \
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


# Build solutions_par_criteres and criteres table

sqlite-utils insert pacoupa.db solutions_par_criteres solutions_par_criteres_clean.csv --csv -d
sqlite-utils extract pacoupa.db solutions_par_criteres CH ECS emetteur espace_exterieur env_contraint toiture_terrasse temperature nb_lgts niveau_renovation --table criteres
sqlite-utils convert pacoupa.db solutions_par_criteres solution \
'bits = value.split("-")
return {
  "solutions_id": bits[0].strip(),
}' --multi

sqlite-utils transform pacoupa.db solutions_par_criteres \
--drop solution \
--drop usage_CH \
--drop usage_ECS \
--drop usage_FR \
--drop alertes \
-o criteres_id -o solutions_id -o ordre_solution


sqlite-utils add-foreign-key pacoupa.db solutions_par_criteres solutions_id solutions id

rm solutions_clean.csv
rm solutions_par_criteres_clean.csv
