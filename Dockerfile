# Use an official Node.js runtime as a parent image
FROM node:18.15.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to /app
COPY package*.json server/package*.json client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

ARG GOOGLE_CLIENT_ID=you-client-id

ENV DATABASE_URL=your-databse-url
ENV JWT_SEED=your-jwt-seed
ENV VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

RUN npm run build:front && npm run server:generate && npm run build:server

# Set the command to start the application
CMD ["npm", "start"]
