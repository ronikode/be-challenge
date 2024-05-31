FROM node:20.11.1-slim

RUN apt-get update -y \    
  && apt-get install openssl make python3 cmake g++ -y \    
  && apt-get upgrade -y \    
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# Install Prisma manually for running migrations
# RUN yarn add prisma
# RUN yarn prisma migrate dev
# RUN yarn prisma:generate
# RUN yarn prisma db seed
EXPOSE 3000
