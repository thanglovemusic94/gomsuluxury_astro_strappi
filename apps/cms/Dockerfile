# CMS (Strapi) — chạy trên VPS
FROM node:22-alpine AS base
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git python3
WORKDIR /opt/app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS build
COPY --from=deps /opt/app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /opt/app
COPY --from=build /opt/app ./
RUN mkdir -p public/uploads .tmp && chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
