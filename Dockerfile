# syntax=docker/dockerfile:1
# Purpose: Build a small, production-ready image for a Node.js app that listens on port 3000.

FROM node:20-alpine

WORKDIR /app

# Install dependencies based on lockfile (production only)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Run as non-root for security
USER node

# Container listens on 3000 (documented) and default PORT env set
ENV PORT=3000
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]

