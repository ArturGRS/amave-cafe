# Estágio 1: Instala dependências e faz o build (gera a pasta dist)
FROM node:20-alpine as builder
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copia o restande do código e roda o build do Vite
COPY . .
RUN npm run build

# Estágio 2: Usa o Nginx para servir os arquivos estáticos compilados
FROM nginx:alpine
# Copia o resultado do build (pasta dist) para a pasta padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
