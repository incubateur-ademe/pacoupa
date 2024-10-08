SCRIPT_DIR=$(realpath $(dirname $0))
ASSETS_DIR=$(realpath "$SCRIPT_DIR/../../assets")

echo "SCRIPT_DIR: $SCRIPT_DIR"
echo "ASSETS_DIR: $ASSETS_DIR"

cd $SCRIPT_DIR

if [ -f $ASSETS_DIR/pacoupa.db ]; then
  rm $ASSETS_DIR/pacoupa.db
fi

# preparation ----------------------------------------------------------------------------------

echo "Preparation..."
echo "convert files to utf-8 and remove empty lines"

iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/solutions.csv > $ASSETS_DIR/solutions_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/solutions_par_criteres.csv > $ASSETS_DIR/solutions_par_criteres_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/bdd_energie_h1.csv | grep -v '^;' > $ASSETS_DIR/bdd_energie_h1_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/bdd_energie_h2.csv | grep -v '^;' > $ASSETS_DIR/bdd_energie_h2_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/bdd_energie_h3.csv | grep -v '^;' > $ASSETS_DIR/bdd_energie_h3_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/bdd_eco_h1.csv | grep -v '^;' > $ASSETS_DIR/bdd_eco_h1_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/bdd_eco_h2.csv | grep -v '^;' > $ASSETS_DIR/bdd_eco_h2_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/bdd_eco_h3.csv | grep -v '^;' > $ASSETS_DIR/bdd_eco_h3_clean.csv
iconv -f utf-8 -t utf-8 -c  $ASSETS_DIR/typologies.csv > $ASSETS_DIR/typologies_clean.csv

# check ---------------------------------------------------------------------------------------

echo "Check data..."
echo "(only bdd_energie is checked)"

ASSETS_DIR=$ASSETS_DIR node --loader ts-node/esm ./validate_bdd_energie.mts
#ASSETS_DIR=$ASSETS_DIR node --loader ts-node/esm ./validate_typologies.mts

echo "Build database tables from csv files..."

# run scripts ---------------------------------------------------------------------------------
ASSETS_DIR=$ASSETS_DIR ./build_solutions.sh
ASSETS_DIR=$ASSETS_DIR ./build_solutions_par_criteres.sh
ASSETS_DIR=$ASSETS_DIR ./build_bdd_energie.sh
ASSETS_DIR=$ASSETS_DIR ./build_bdd_eco.sh
ASSETS_DIR=$ASSETS_DIR ./build_typologies.sh

# post ----------------------------------------------------------------------------------------

echo "Remove temporary files..."

rm $ASSETS_DIR/solutions_clean.csv
rm $ASSETS_DIR/solutions_par_criteres_clean.csv
rm $ASSETS_DIR/bdd_energie_h1_clean.csv
rm $ASSETS_DIR/bdd_energie_h2_clean.csv
rm $ASSETS_DIR/bdd_energie_h3_clean.csv
rm $ASSETS_DIR/bdd_eco_h1_clean.csv
rm $ASSETS_DIR/bdd_eco_h2_clean.csv
rm $ASSETS_DIR/bdd_eco_h3_clean.csv
rm $ASSETS_DIR/typologies_clean.csv
