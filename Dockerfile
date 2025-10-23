# Stage 1 — builder
FROM node:20-alpine AS builder
WORKDIR /app

# copy package files first for caching
COPY package.json package-lock.json* ./
RUN npm ci --silent

# copy source and build
COPY . .
RUN npm run build

# Stage 2 — runtime
FROM node:20-alpine AS runner
WORKDIR /app

# only production deps
COPY package.json package-lock.json* ./
RUN npm ci --only=production --silent

# copy built artefacts
COPY --from=builder /app/dist ./dist
# if you serve static assets, copy them too:
# COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=8989
EXPOSE 8989

CMD ["node", "dist/main.js"]