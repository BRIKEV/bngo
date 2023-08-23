# Foodai app

This repository contains all the code od the Foodai app. In this doc we will cover this:

1. Technology used and requirements.
2. Project structure.
3. How to run the project.

## 1. Technology used and requirements

This Project consists in a Basic SPA with [React.js](https://react.dev/) and a [Node.js](https://nodejs.org/en/) server. We are using this technologies:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/) for both, client and server code
- [React.js](https://react.dev/) for the client code with [Vite bundler](https://vitejs.dev/).
- [Docker](https://www.docker.com/) to run the local DB
- [Postgres](https://www.postgresql.org/) as a DB.
- [Prisma](https://www.prisma.io/) as an ORM.
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) as state manager.

As a requirement, you need a [Node.js](https://nodejs.org/en/) version higher than 18 and LTS. We are also using [prettier to format the code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

## 2. Project structure

```
├── client/src
│   └── assets
│   └── components
│   └── constants
│   └── Layouts
│   └── pages
│   └── services
│   └── session
│   └── store
└── server/
    ├── config/
    ├── controllers/
    ├── docker/
    ├── docsValidator/
    ├── models/
    ├── prisma/
    ├── routes/
    ├── tests/
    ├── app.ts
    ├── server.ts
```

We have two main folders `client` and `server`. As we are doing a monolith Architecture we have a monorepo with both frontend and backend code.

On each folder you will find more info about them in their README.md files. Only **ONE IMPORNTANT THING**, as we are using [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) the way of installing packages is this:

```bash
# For example debug package in the server code
npm i --save debug -w server
# For example yup in the frontend
npm i --save yup -w client
```

## 3. How to run the project.

Install dependencies.

```
npm i
```

Probably if you work on the backend or the client you need to add a `.env` file. More info in their README.md files.

If you are going to work in the backend we recomment to install a postgres database client like [DBeaver](https://dbeaver.io/) and execute this command.

```
npm run init:db
```

## TODOS

- [ ] Fix bingo logic
- [ ] show winner
- [ ] deploy
- [ ] frontend improvements bngo
- [ ] logout on finish
- [ ] frontend improvements create game
- [ ] Testing backend
- [ ] testing frontend
