# Idle game

TODO Descripption BLABLABLA

## Prerequisites

You must have node, yarn, docker and docker-compose running on your machine
⚠️ You must have yarn specifically to be able to run the CLI or use the shortcut scripts.

## Automatic setup

- `yarn` to install dependencies
- `yarn cli:run setup` to setup the project
- You're done !

## Manual setup

- `yarn` to install dependencies
- create a `.env` file at `apps/server` and copy-paste the contentof `apps/server/.env.example` into it
- create a `.env` file at `apps/client` and copy-paste the contentof `apps/client/.env.example` into it
- If you are using docker, run `yarn db:start` at the project root. Otherwise, make sure your database is available. Don't forget to update the `DATABASE_URL` variable in the `apps/server/.env` file !
- Generate the prisma schema and synchronize it to the database by running `yarn db:sync`.
- It took you a bit longer, but you're done !

## Run the project locally in development mode

run `yarn dev` at the project root

## Build and run the production version or the project

- run `yarn build` at the project root
- run `yarn start` at the project root
