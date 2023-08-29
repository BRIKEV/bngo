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

ARG SUPABASE_ANON_KEY=your-supabase-anon-key
ARG SUPABASE_HOST=your-supabase-host

ENV SUPABASE_ANON_KEY=your-databse-url
ENV SUPABASE_HOST=your-supabase-host
ENV JWT_SECRET=your-jwt-secret
ENV VITE_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
ENV VITE_SUPABASE_HOST=$SUPABASE_HOST

RUN npm run build:front && npm run build:server

# Set the command to start the application
CMD ["npm", "start"]
