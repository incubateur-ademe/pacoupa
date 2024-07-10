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
--drop "14 - PAC abso gaz" \
--drop "24 - PAC abso gaz" \
--rename "01 - PAC Air / Eau" solution_01 \
--rename "02 - PAC Air / Eau (gainée)" solution_02 \
--rename "03 - PAC Eaux grises / Eau" solution_03 \
--rename "04 - PAC sur capteur solaire atmosphérique" solution_04 \
--rename "05 - Hybride : PAC + chaudière" solution_05 \
--rename "06 - Hybride : PAC (gainée) + chaudière" solution_06 \
--rename "07 - PAC sur air extrait" solution_07 \
--rename "08 - PAC Eau / Eau géothermique" solution_08 \
--rename "10 - PAC Air / Eau" solution_10 \
--rename "11 - PAC Air / Eau (gainée)" solution_11 \
--rename "12 - PAC Air / Air (DRV)" solution_12 \
--rename "13 - PAC Eau / Eau géothermique" solution_13 \
--rename "15 - Hybride : PAC + chaudière" solution_15 \
--rename "16 - Hybride : PAC (gainée) + chaudière" solution_16 \
--rename "20 - PAC Air / Eau" solution_20 \
--rename "21 - PAC Air / Eau (gainée)" solution_21 \
--rename "22 - PAC Air / Air (DRV)" solution_22 \
--rename "23 - PAC Eau / Eau géothermique" solution_23 \
--rename "25 - Hybride : PAC + chaudière" solution_25 \
--rename "26 - Hybride : PAC (gainée) + chaudière" solution_26 \
--rename "30 - CET Air extrait / Eau" solution_30 \
--rename "31 - CET Air / Eau (avec unité extérieure)" solution_31 \
--rename "32 - CET Air / Eau (intérieur)" solution_32 \
--rename "40 - PAC Air / Air" solution_40 \
--rename "50 - PAC Air / Eau (avec unité extérieure)" solution_50 \
--rename "51 - PAC Air / Eau (intérieure)" solution_51 \
--rename "52 - PAC Air / Air avec ECS" solution_52 \
--rename "53 - PAC Air extrait / Eau" solution_53 \
--rename "54 - PAC Air / Eau avec chauffage par l'air" solution_54 \
--rename "60 - PAC individuelle sur boucle d'eau" solution_60 \
--rename "61 - CET individuel sur retour de chauffage collectif" solution_61 \



# This index save a lot of time when querying the database and prevent to read a bunch of lines.
# Which is good because Turso have a free tiers for 1 billion of lines per month.
sqlite-utils create-index $ASSETS_DIR/pacoupa.db bdd_cout typologie ECS CH scenario_renovation_enveloppe scenario_renovation_systeme































