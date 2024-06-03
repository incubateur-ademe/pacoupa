SCRIPT_DIR=$(realpath $(dirname $0))
ASSETS_DIR=$(realpath "$SCRIPT_DIR/../../assets")

echo "SCRIPT_DIR: $SCRIPT_DIR"
echo "ASSETS_DIR: $ASSETS_DIR"

cd $SCRIPT_DIR

if [ -f $ASSETS_DIR/pacoupa.db ]; then
  rm $ASSETS_DIR/pacoupa.db
fi

# pre ----------------------------------------------------------------------------------------
# prevent characters issues
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/solutions.csv > $ASSETS_DIR/solutions_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/solutions_par_criteres.csv > $ASSETS_DIR/solutions_par_criteres_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/bdd_energie.csv > $ASSETS_DIR/bdd_energie_clean.csv

# check ---------------------------------------------------------------------------------------
#ASSETS_DIR=$ASSETS_DIR check_solutions.mts


# run scripts ---------------------------------------------------------------------------------
ASSETS_DIR=$ASSETS_DIR ./build_solutions.sh
ASSETS_DIR=$ASSETS_DIR ./build_solutions_par_criteres.sh
ASSETS_DIR=$ASSETS_DIR ./build_bdd_energie.sh

# post ----------------------------------------------------------------------------------------
rm $ASSETS_DIR/solutions_clean.csv
rm $ASSETS_DIR/solutions_par_criteres_clean.csv
rm $ASSETS_DIR/bdd_energie_clean.csv
