# Etapa 1: Usando a imagem oficial do Node.js baseada em Alpine
FROM node:20.13.1-alpine 

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


RUN npm install -g serve


EXPOSE 3001


CMD ["serve", "-s", "build", "-l", "3001"]
