## bngo-server

In this folder you will find all the code related to the sockets and redis database. This API is made with [Typescript](https://www.typescriptlang.org/), [Express.js](https://expressjs.com/) and SocketIO.

The Project uses [Redis]() and [Supabase]() to handle the Database.

This is the folder structure, on each folder you will have a README.md file with more info if necessary.

```
├── config/
├── controllers/
├── docker/
├── models/
├── prisma/
├── io/
├── tests/
├── utils/
├── app.ts
├── server.ts
```

## Run the project

To run this project you need [Docker](https://www.docker.com/) installed and running. Then you only need to execute these commands, after you run the global installation in the main folder of this repository.

```bash
# start db and migrations
npm run init:db
# execute basic seed to run dev mode. This includes static info
npm run seed
# execute tests in dev mode
npm run test:dev
# or you can run in local (not recommended use test mode instead)
npm run server:dev
```

Your are going to need to create a `.env` file similar to the `.env.example` one.

```
REDIS_URL=redis://localhost:6379
```
