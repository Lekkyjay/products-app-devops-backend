FROM node:23.11-alpine3.20
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 5000
CMD ["node", "dist/server.js"]
