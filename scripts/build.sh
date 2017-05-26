SRC_LIB=./src
OUT_LIB=./lib

SRC_EG=./src/example
OUT_EG=./example

# Delete the build directories
rm -rf $OUT_LIB $OUT_EG
mkdir -p $OUT_LIB $OUT_EG

# Run the Linter
eslint .

# Build the library
babel --out-dir $OUT_LIB --ignore $SRC_EG $SRC_LIB
# babel --out-dir $OUT_EG --source-maps inline --copy-files $SRC_EG

# Maybe do this:
# https://rollupjs.org/#using-rollup-with-babel
# rollup $SRC_EG/index.js --format iife --output $OUT_EG/index.js
# cp $SRC_EG/index.html $OUT_EG
