#!/bin/bash
APP=$1

cd "$(dirname "$0")/.." || exit
railway variable -s $APP --set "RAILWAY_DOCKERFILE_PATH=./apps/$APP/Dockerfile"
railway up -c -s $APP
