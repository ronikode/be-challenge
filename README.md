## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This repository was created to implement a RESTful api that services requests for sprocket factory data and sprockets.

## Using this repository

- [Description](#description)
- [Using this repository](#using-this-repository)
- [Requirements](#requirements)
- [Running a development environment](#running-a-development-environment)
  - [Steps](#steps)

## Requirements

Firstly you need to install all dependencies and running commands (I added `yarn`)

Reminder:

## Running a development environment

### Steps

1. Clone the repository
2. Install requirements
3. Setup personal environments variable
4. Create a file `.env` based on `env.template` should be in the root.
5. For DB create a file `docker-compose.yml` based on `docker-compose.example.yml` should be in the root.
6. Startup databases `docker compose build up -d`
7. Run the project `yarn start:dev`
8. Seed the data `yarn prisma db seed`
9. Check the swagger documentation in: `http://localhost:3010/api/v1/`

**⚠️ Note:** The Docker build process takes time on the initial installation. So don't open the web browser until you see these messages in the terminal:
