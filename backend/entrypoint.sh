#!/bin/bash
if [ "$NODE_ENV" = "development" ]; then
  echo "Executando em ambiente de desenvolvimento"
  npm run dev
else
  echo "Executando em ambiente de produção"
  npm run build
  npm run start
fi