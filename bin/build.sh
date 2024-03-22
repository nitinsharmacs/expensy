#! /bin/bash

# building ui bundle
echo "############# Building UI bundle #############"
cd ui
npm install
npm run build
rm -rf node_modules
cd -

# moving to root dir
echo "############# Moving bundle #############"
mv ./ui/build public