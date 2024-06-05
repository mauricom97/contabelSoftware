# Use a imagem oficial do Node.js como base
FROM node:20

# Crie um diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install
RUN npm install cors

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Gere os artefatos do Prisma
RUN cd src && npx prisma format
RUN cd src && npx prisma generate

# Exponha a porta 3000, que é a porta padrão do Next.js
EXPOSE 4356

RUN npm run build

# Comando para iniciar o servidor
CMD ["npm", "start"]