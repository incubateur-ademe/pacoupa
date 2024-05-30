cd $ASSETS_DIR

if [ -f pacoupa.db ]; then
  rm pacoupa.db
fi

# Prevent encoding issues
iconv -f utf-8 -t utf-8 -c solutions.csv > solutions_clean.csv
iconv -f utf-8 -t utf-8 -c solutions_par_criteres.csv > solutions_par_criteres_clean.csv
iconv -f utf-8 -t utf-8 -c bdd_energie.csv > bdd_energie_clean.csv

