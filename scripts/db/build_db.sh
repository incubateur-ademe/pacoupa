cd $(dirname $0)
cd ../../assets/

rm pacoupa.db

# Build solutions table

sqlite-utils insert pacoupa.db solutions solutions.csv --csv -d

sqlite-utils convert pacoupa.db solutions num_solution \
'bits = value.split("-")
return {
  "id": bits[0].strip(),
  "name": bits[1].strip(),
}' --multi

-- réordonne les colonnes importantes en premier
sqlite-utils transform pacoupa.db solutions \
-o id -o name \
--pk id

sqlite-utils transform pacoupa.db solutions \
--drop num_solution

# Build solutions_par_cas and caracteristiques table

sqlite-utils insert pacoupa.db solutions_par_cas solutions_par_cas.csv --csv -d
sqlite-utils extract pacoupa.db solutions_par_cas CH ECS emetteur espace_exterieur env_contraint toiture_terrasse temperature nb_lgts niveau_renovation --table caracteristiques
sqlite-utils convert pacoupa.db solutions_par_cas solution \
'bits = value.split("-")
return {
  "id_solution": bits[0].strip(),
}' --multi

sqlite-utils transform pacoupa.db solutions_par_cas \
--drop solution \
-o caracteristiques_id -o id_solution -o ordre_solution

sqlite-utils add-foreign-key pacoupa.db solutions_par_cas id_solution solutions id
