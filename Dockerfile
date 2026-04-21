FROM node:20-alpine
WORKDIR /app

# Copia os arquivos de configuração do NPM
COPY package*.json ./

# Instala apenas as dependências de produção (express, cors)
RUN npm install --production

# Copia o restante do código (incluindo index.html, server.js, etc.)
COPY . .

# Expõe a porta que configuramos no server.js (3000)
EXPOSE 3000

# Executa o servidor Node que atua como WebServer Estático e Proxy
CMD ["npm", "start"]
