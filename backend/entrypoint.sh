#!/bin/bash
if [ "$NODE_ENV" = "production" ]; then
  echo "Executando em ambiente de produção"
  npm run start
else
  echo "Executando em ambiente de desenvolvimento"
  npm run dev
fi