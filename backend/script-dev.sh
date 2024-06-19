sudo rm -rf dist/
npm run build
docker-compose build --build-arg NODE_ENV=development
docker-compose up