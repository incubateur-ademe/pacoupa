ARG NODE_VERSION=21-alpine3.18@sha256-cacb4e3a208aa34e0f821b56256e446ad984960d4f9aca66c7026e16b87db89f

# Install dependencies only when needed
FROM node:$NODE_VERSION AS builder
RUN apk add --no-cache libc6-compat=1.2.4-r2
WORKDIR /app

COPY yarn.lock ./
RUN yarn fetch --frozen-lockfile
COPY . .

ARG PRODUCTION
ENV PRODUCTION $PRODUCTION
ARG GITHUB_SHA
ENV GITHUB_SHA $GITHUB_SHA
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL $NEXT_PUBLIC_SITE_URL

ENV NODE_ENV production
WORKDIR /app

RUN yarn postinstall # if you have postinstall script in your package.json
RUN if [ -z "$PRODUCTION" ]; then \
  echo "Overriding .env for staging"; \
  cp .env.staging .env.production; \
  fi && \
  yarn build:export 

RUN yarn fetch-tools production && yarn cache clean

# Production image, copy all the files and run next
FROM ghcr.io/socialgouv/docker/nginx:sha-1d70757 AS runner

COPY --from=builder /app/out /usr/share/nginx/html

# Disable nextjs telemetry
ENV NEXT_TELEMETRY_DISABLED 1
