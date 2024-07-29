sqlite-utils insert $ASSETS_DIR/pacoupa.db bdd_eco $ASSETS_DIR/bdd_eco_clean.csv --csv -d --delimiter ';'

sqlite-utils transform $ASSETS_DIR/pacoupa.db bdd_eco \
--pk id \
--drop periode_constructive \
--drop emetteur \
--drop usage_CH \
--drop usage_ECS \
--drop Annexe \
--drop gain_energetique_% \
--drop seuil_35% \
--drop seuil_50% \
--drop bonification_sortie_passoire \
--rename "01 - PAC Air / Eau" cout_solution_01 \
--rename "02 - PAC Air / Eau (gainée)" cout_solution_02 \
--rename "03 - PAC Eaux grises / Eau" cout_solution_03 \
--rename "04 - PAC sur capteur solaire atmosphérique" cout_solution_04 \
--rename "05 - Hybride : PAC + chaudière" cout_solution_05 \
--rename "06 - Hybride : PAC (gainée) + chaudière" cout_solution_06 \
--rename "07 - PAC sur air extrait" cout_solution_07 \
--rename "08 - PAC Eau / Eau géothermique" cout_solution_08 \
--rename "10 - PAC Air / Eau" cout_solution_10 \
--rename "11 - PAC Air / Eau (gainée)" cout_solution_11 \
--rename "12 - PAC Air / Air (DRV)" cout_solution_12 \
--rename "13 - PAC Eau / Eau géothermique" cout_solution_13 \
--rename "15 - Hybride : PAC + chaudière" cout_solution_15 \
--rename "16 - Hybride : PAC (gainée) + chaudière" cout_solution_16 \
--rename "20 - PAC Air / Eau" cout_solution_20 \
--rename "21 - PAC Air / Eau (gainée)" cout_solution_21 \
--rename "22 - PAC Air / Air (DRV)" cout_solution_22 \
--rename "23 - PAC Eau / Eau géothermique" cout_solution_23 \
--rename "25 - Hybride : PAC + chaudière" cout_solution_25 \
--rename "26 - Hybride : PAC (gainée) + chaudière" cout_solution_26 \
--rename "30 - CET Air extrait / Eau" cout_solution_30 \
--rename "31 - CET Air / Eau (avec unité extérieure)" cout_solution_31 \
--rename "32 - CET Air / Eau (intérieur)" cout_solution_32 \
--rename "40 - PAC Air / Air" cout_solution_40 \
--rename "50 - PAC Air / Eau (avec unité extérieure)" cout_solution_50 \
--rename "51 - PAC Air / Eau (intérieure)" cout_solution_51 \
--rename "52 - PAC Air / Air avec ECS" cout_solution_52 \
--rename "53 - PAC Air extrait / Eau" cout_solution_53 \
--rename "54 - PAC Air / Eau avec chauffage par l'air" cout_solution_54 \
--rename "60 - PAC individuelle sur boucle d'eau" cout_solution_60 \
--rename "61 - CET individuel sur retour de chauffage collectif" cout_solution_61 \
--rename "aides - 01 - PAC Air / Eau" aides_solution_01 \
--rename "aides - 02 - PAC Air / Eau (gainée)" aides_solution_02 \
--rename "aides - 03 - PAC Eaux grises / Eau" aides_solution_03 \
--rename "aides - 04 - PAC sur capteur solaire atmosphérique" aides_solution_04 \
--rename "aides - 05 - Hybride : PAC + chaudière" aides_solution_05 \
--rename "aides - 06 - Hybride : PAC (gainée) + chaudière" aides_solution_06 \
--rename "aides - 07 - PAC sur air extrait" aides_solution_07 \
--rename "aides - 08 - PAC Eau / Eau géothermique" aides_solution_08 \
--rename "aides - 10 - PAC Air / Eau" aides_solution_10 \
--rename "aides - 11 - PAC Air / Eau (gainée)" aides_solution_11 \
--rename "aides - 12 - PAC Air / Air (DRV)" aides_solution_12 \
--rename "aides - 13 - PAC Eau / Eau géothermique" aides_solution_13 \
--rename "aides - 15 - Hybride : PAC + chaudière" aides_solution_15 \
--rename "aides - 16 - Hybride : PAC (gainée) + chaudière" aides_solution_16 \
--rename "aides - 20 - PAC Air / Eau" aides_solution_20 \
--rename "aides - 21 - PAC Air / Eau (gainée)" aides_solution_21 \
--rename "aides - 22 - PAC Air / Air (DRV)" aides_solution_22 \
--rename "aides - 23 - PAC Eau / Eau géothermique" aides_solution_23 \
--rename "aides - 25 - Hybride : PAC + chaudière" aides_solution_25 \
--rename "aides - 26 - Hybride : PAC (gainée) + chaudière" aides_solution_26 \
--rename "aides - 30 - CET Air extrait / Eau" aides_solution_30 \
--rename "aides - 31 - CET Air / Eau (avec unité extérieure)" aides_solution_31 \
--rename "aides - 32 - CET Air / Eau (intérieur)" aides_solution_32 \
--rename "aides - 40 - PAC Air / Air" aides_solution_40 \
--rename "aides - 50 - PAC Air / Eau (avec unité extérieure)" aides_solution_50 \
--rename "aides - 51 - PAC Air / Eau (intérieure)" aides_solution_51 \
--rename "aides - 52 - PAC Air / Air avec ECS" aides_solution_52 \
--rename "aides - 53 - PAC Air extrait / Eau" aides_solution_53 \
--rename "aides - 54 - PAC Air / Eau avec chauffage par l'air" aides_solution_54 \
--rename "aides - 60 - PAC individuelle sur boucle d'eau" aides_solution_60 \
--rename "aides - 61 - CET individuel sur retour de chauffage collectif" aides_solution_61 \
--not-null zone_climatique \
--not-null typologie \
--not-null etat_menuiseries \
--not-null etat_isolation_plancher_bas \
--not-null etat_isolation_plancher_haut \
--not-null etat_isolation_murs \
--not-null scenario_renovation_enveloppe \
--not-null type_CH \
--not-null type_ECS \
--not-null CH \
--not-null ECS \
--not-null scenario_renovation_systeme \
--not-null cout_solution_01 \
--not-null cout_solution_02 \
--not-null cout_solution_03 \
--not-null cout_solution_04 \
--not-null cout_solution_05 \
--not-null cout_solution_06 \
--not-null cout_solution_07 \
--not-null cout_solution_08 \
--not-null cout_solution_10 \
--not-null cout_solution_11 \
--not-null cout_solution_12 \
--not-null cout_solution_13 \
--not-null cout_solution_15 \
--not-null cout_solution_16 \
--not-null cout_solution_20 \
--not-null cout_solution_21 \
--not-null cout_solution_22 \
--not-null cout_solution_23 \
--not-null cout_solution_25 \
--not-null cout_solution_26 \
--not-null cout_solution_30 \
--not-null cout_solution_31 \
--not-null cout_solution_32 \
--not-null cout_solution_40 \
--not-null cout_solution_50 \
--not-null cout_solution_51 \
--not-null cout_solution_52 \
--not-null cout_solution_53 \
--not-null cout_solution_54 \
--not-null cout_solution_60 \
--not-null cout_solution_61 \
--not-null aides_solution_01 \
--not-null aides_solution_02 \
--not-null aides_solution_03 \
--not-null aides_solution_04 \
--not-null aides_solution_05 \
--not-null aides_solution_06 \
--not-null aides_solution_07 \
--not-null aides_solution_08 \
--not-null aides_solution_10 \
--not-null aides_solution_11 \
--not-null aides_solution_12 \
--not-null aides_solution_13 \
--not-null aides_solution_15 \
--not-null aides_solution_16 \
--not-null aides_solution_20 \
--not-null aides_solution_21 \
--not-null aides_solution_22 \
--not-null aides_solution_23 \
--not-null aides_solution_25 \
--not-null aides_solution_26 \
--not-null aides_solution_30 \
--not-null aides_solution_31 \
--not-null aides_solution_32 \
--not-null aides_solution_40 \
--not-null aides_solution_50 \
--not-null aides_solution_51 \
--not-null aides_solution_52 \
--not-null aides_solution_53 \
--not-null aides_solution_54 \
--not-null aides_solution_60 \
--not-null aides_solution_61 \
--not-null cout_abonnement \
--not-null cout_maintenance \
--not-null facture_energetique


# This index save a lot of time when querying the database and prevent to read a bunch of lines.
# Which is good because Turso have a free tiers for 1 billion of lines per month.
sqlite-utils create-index $ASSETS_DIR/pacoupa.db bdd_eco typologie ECS CH scenario_renovation_enveloppe scenario_renovation_systeme




