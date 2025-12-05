FROM node:22-alpine AS base

# Accept build arguments for metadata
ARG BUILDTIME
ARG VERSION
ARG REVISION

# Set build-time labels
LABEL org.opencontainers.image.created=${BUILDTIME}
LABEL org.opencontainers.image.version=${VERSION}
LABEL org.opencontainers.image.revision=${REVISION}

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY prisma package.json pnpm-lock.yaml ./

# Add yarn timeout to handle slow CPU when Github Actions
RUN corepack enable pnpm && pnpm config set network-timeout 300000
RUN pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable pnpm && pnpm build-docker

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ARG PRISMA_VERSION="6.12.0"
ARG NODE_OPTIONS

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=$NODE_OPTIONS

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN set -x \
    && apk add --no-cache curl \
    && corepack enable pnpm \
    && pnpm add prisma@${PRISMA_VERSION}

# Permissions for prisma
RUN chown -R nextjs:nodejs node_modules/.pnpm/

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV HOSTNAME=0.0.0.0
ENV PORT=3000

ENTRYPOINT ["./scripts/entrypoint.sh"]
