# Build stage
FROM node:18-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Nettoyer le cache npm et installer les dépendances
RUN npm cache clean --force && \
    rm -rf node_modules package-lock.json && \
    npm install

# Copier le reste des fichiers source
COPY . .

# Build de l'application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers buildés depuis le stage précédent
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
