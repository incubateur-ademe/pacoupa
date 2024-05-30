SCRIPT_DIR=$(realpath $(dirname $0))
ASSETS_DIR=$(realpath "$SCRIPT_DIR/../../assets")

echo "SCRIPT_DIR: $SCRIPT_DIR"
echo "ASSETS_DIR: $ASSETS_DIR"

cd $SCRIPT_DIR

ASSETS_DIR=$ASSETS_DIR ./build_pre.sh
ASSETS_DIR=$ASSETS_DIR ./build_solutions.sh
ASSETS_DIR=$ASSETS_DIR ./build_solutions_par_criteres.sh
ASSETS_DIR=$ASSETS_DIR ./build_bdd_energie.sh
ASSETS_DIR=$ASSETS_DIR ./build_post.sh



