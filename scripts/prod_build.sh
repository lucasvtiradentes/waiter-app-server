#!/bin/bash

# SET VARIABLES ================================================================
CUR_FOLDER=$(pwd)
SCRIPTS_FOLDER="$CUR_FOLDER/scripts"
DIST_FOLDER="$CUR_FOLDER/build"
APPS_FOLDER="$CUR_FOLDER/apps"
BACKEND_FOLDER="$APPS_FOLDER/waiter_backend"
FRONTEND_FOLDER="$APPS_FOLDER/waiter_frontend"

# SHOW VARIABLES ===============================================================
echo $CUR_FOLDER
echo $DIST_FOLDER
echo $APPS_FOLDER
echo $SCRIPTS_FOLDER

# CHECK IF APPS FOLDER EXIST ===================================================
if [ ! -d "$APPS_FOLDER" ]; then
  echo "exiting because APPS_FOLDER dont exist"
  exit 1
fi

# DELETE OLD DIST FOLDER =======================================================
if [ -d "$DIST_FOLDER" ]; then
  echo "delete old DIST FOLDER"
  rm -rf "$DIST_FOLDER";
fi

# CREATE NEW DIST FOLDER =======================================================
echo "copy packages build to DIST FOLDER"
mkdir $DIST_FOLDER

# BUILD BACKEND ================================================================
cd $BACKEND_FOLDER
npm install
npm run build

# SETUP BACKEND ================================================================
cp "$BACKEND_FOLDER/package.json" "$DIST_FOLDER/package.json"
cp -r "$BACKEND_FOLDER/build" "$DIST_FOLDER/waiter_backend"
cp -r "$BACKEND_FOLDER/uploads" "$DIST_FOLDER/uploads"

# BUILD FRONTEND ===============================================================
cd $FRONTEND_FOLDER
npm install
npm run build

# SETUP FRONTEND ===============================================================
cp -r "$APPS_FOLDER/waiter_frontend/dist" "$DIST_FOLDER/waiter_frontend"

# INSTALL PRODUCTION MODULES  ==================================================
cd $DIST_FOLDER
npm install
