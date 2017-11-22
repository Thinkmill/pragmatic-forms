# Clear and recreate the lib directory
# rm -rf ./lib
mkdir -p ./lib
# Compile with babel
babel src/index.js --out-file lib/index.js
# Build the examples
webpack
