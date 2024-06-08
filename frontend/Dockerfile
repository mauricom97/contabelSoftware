# Use a imagem oficial do Node.js como base
FROM node:20

# Crie um diretório de trabalho dentro do container
WORKDIR /usr/src/app
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Copie o package.json e o package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta 3000, que é a porta padrão do Next.js
EXPOSE 3000

COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Comando para iniciar o servidor
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]