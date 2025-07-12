FROM node:22-alpine AS builder

WORKDIR /usr/app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install
RUN pnpm install typescript -D

RUN pnpm run build

EXPOSE 8080

CMD ["node", "build/index.js"]