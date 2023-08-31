# Use an official Node.js runtime as a parent image
FROM node:18.15.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to /app
RUN mkdir client server
COPY package*.json ./
COPY server/package*.json ./server
COPY client/package*.json ./client

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

ARG VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
ARG VITE_SUPABASE_HOST=your-supabase-host

ENV SUPABASE_ANON_KEY=your-databse-url
ENV SUPABASE_HOST=your-supabase-host
ENV JWT_SECRET=your-jwt-secret
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_HOST=$VITE_SUPABASE_HOST

RUN npm run build:front && npm run build:server

# Set the command to start the application
CMD ["npm", "start"]
