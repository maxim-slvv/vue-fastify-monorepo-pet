FROM node:20-alpine AS base
WORKDIR /app

# Copy monorepo manifests
COPY package.json yarn.lock* .yarnrc.yml ./
COPY lerna.json nx.json tsconfig.json typescript.base.json ./

# Copy client package
COPY apps/client/package.json apps/client/

# Install only client workspace deps
RUN corepack enable \
  && corepack prepare yarn@4.6.0 --activate \
  && yarn workspaces focus vue-pet

FROM base AS build
COPY . .
RUN yarn workspaces focus vue-pet --production=false \
  && yarn --cwd apps/client build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/client/dist ./apps/client/dist
COPY --from=build /app/apps/client/package.json ./apps/client/package.json
RUN corepack enable \
  && corepack prepare yarn@4.6.0 --activate \
  && yarn workspaces focus vue-pet --production

EXPOSE 4000
CMD ["npx", "serve", "-s", "apps/client/dist", "-l", "4000"]


