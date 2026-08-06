# Optional: build Astro image for VPS (nếu không dùng Vercel)
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG PUBLIC_STRAPI_URL=http://localhost:1337
ARG PUBLIC_SITE_URL=http://localhost:4321
ENV PUBLIC_STRAPI_URL=$PUBLIC_STRAPI_URL
ENV PUBLIC_SITE_URL=$PUBLIC_SITE_URL
RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
