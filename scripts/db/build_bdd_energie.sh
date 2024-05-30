cd $ASSETS_DIR

# Build bdd_energie table
sqlite-utils insert pacoupa.db bdd_energie bdd_energie_clean.csv --csv -d


# réordonne les colonnes importantes en premier
sqlite-utils transform pacoupa.db bdd_energie \
--pk id \
--drop Annexe \

