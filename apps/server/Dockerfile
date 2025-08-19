FROM node:20-alpine AS base
WORKDIR /app

# Copy monorepo manifests
COPY package.json yarn.lock* .yarnrc.yml ./
COPY lerna.json nx.json tsconfig.json typescript.base.json ./

# Copy server package
COPY apps/server/package.json apps/server/

# Install only server workspace deps
RUN corepack enable \
  && corepack prepare yarn@4.6.0 --activate \
  && yarn workspaces focus server

# Build stage
FROM base AS build
COPY . .
RUN yarn workspaces focus server --production=false \
  && yarn --cwd apps/server build

# Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/server/dist ./apps/server/dist
COPY --from=build /app/apps/server/package.json ./apps/server/package.json
RUN corepack enable \
  && corepack prepare yarn@4.6.0 --activate \
  && yarn workspaces focus server --production

EXPOSE 3000
CMD ["node", "apps/server/dist/index.js"]


