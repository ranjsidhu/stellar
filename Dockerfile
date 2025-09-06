# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN npm ci


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

ARG NEXT_PUBLIC_DB_URL
ARG NEXT_PUBLIC_DB_API_ANON_KEY

ENV NEXT_PUBLIC_DB_URL=$NEXT_PUBLIC_DB_URL
ENV NEXT_PUBLIC_DB_API_ANON_KEY=$NEXT_PUBLIC_DB_API_ANON_KEY
ENV NODE_ENV=production


COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/generated ./generated
COPY . .


RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app



RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public


COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000


ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]