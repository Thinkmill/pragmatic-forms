# Create the lib directory
mkdir -p ./lib
# Compile with babel
babel src/index.js --out-file lib/index.js
# Build the examples
webpack
