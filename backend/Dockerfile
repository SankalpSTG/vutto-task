# Step 1: Build the app
FROM node:22-alpine AS builder

WORKDIR /usr/app

# Copy package.json and package-lock.json to the container
COPY . .

# Install dependencies
RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install
RUN pnpm install typescript -D

RUN pnpm run build

FROM node:22-alpine

WORKDIR ${LAMBDA_TASK_ROOT}

COPY --from=builder /usr/app/ ./

CMD ["build/index.handler"]