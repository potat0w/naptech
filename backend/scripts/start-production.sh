#!/bin/sh
set -e

if [ ! -f dist/index.js ]; then
  echo "dist/index.js not found — running build"
  npm run build
fi

npm run db:migrate:deploy
exec node dist/index.js
