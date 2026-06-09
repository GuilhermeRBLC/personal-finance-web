# Build do Angular
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration=production

# PRODUÇÃO (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist/personal-finance-web/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o script de inicialização
COPY generate-env.sh /usr/local/bin/generate-env.sh
# Permissão de execução para o script
RUN chmod +x /usr/local/bin/generate-env.sh

EXPOSE 80

# Roda o script
ENTRYPOINT ["/usr/local/bin/generate-env.sh"]