# Use Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Build the React app
RUN npm run build

# Use a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port
EXPOSE 3000

# Start server
CMD ["serve", "-s", "dist", "-l", "3000"]
