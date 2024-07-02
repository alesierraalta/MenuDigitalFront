# Etapa de construcción
FROM node:18.2-alpine AS builder

# Instala pnpm globalmente
RUN npm install -g pnpm

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala las dependencias y construye la aplicación
RUN pnpm install && pnpm run build

# Etapa de producción
FROM nginx:stable-alpine

# Copia la configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos construidos desde la etapa de construcción
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
