FROM node:20.11.1-slim as base

RUN apt-get update -y \    
  && apt-get install openssl make python3 cmake g++ -y \    
  && apt-get upgrade -y \    
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY .npmrc .yarnrc package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS builder

WORKDIR /app

COPY . .

RUN yarn prebuild && yarn build && yarn install --production

# Install Prisma manually for running migrations
RUN yarn add prisma
RUN yarn prisma:generate
RUN yarn prisma db seed


ENV PORT=3000
EXPOSE ${PORT}

CMD [ "node", "dist/main.js" ]
