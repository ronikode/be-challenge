FROM node:20.11.1-slim as base

RUN apt-get update -y \    
  && apt-get install openssl make cmake g++ -y \    
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
# Prisma does not get included as part of package.json beacuse we use
# locally generated client and have no imports of '@prisma/client'
# RUN yarn add prisma
# RUN yarn prisma:generate

ENV PORT=3000
EXPOSE ${PORT}

CMD [ "node", "dist/main.js" ]
