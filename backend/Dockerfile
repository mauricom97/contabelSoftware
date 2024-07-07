# Use a imagem oficial do Node.js como base
FROM node:20

# Crie um diretório de trabalho dentro do container
WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./

RUN npm install
RUN npm install cors nodemon -g

COPY . .

RUN cd src && npx prisma format
RUN cd src && npx prisma generate
RUN npx prisma migrate deploy

COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

EXPOSE 4356
RUN npm run build
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
