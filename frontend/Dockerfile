# =========================================================
# Multi-Stage Dockerfile for LifeFlow AI Frontend
# Stage 1: Build static assets using Node.js
# Stage 2: Serve production bundle with high-performance Nginx
# =========================================================

# Stage 1: Build Environment
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first (leverages Docker layer cache)
COPY package*.json ./
RUN npm install --frozen-lockfile || npm install

# Copy application source code (excluding files defined in .dockerignore)
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine AS runner

# Remove default nginx static assets and config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration for SPA routing & gzip
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static artifacts from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
