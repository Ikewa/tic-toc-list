# Use an official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies first (layer caching)
COPY package*.json ./
RUN npm install

# Copy remaining app files
COPY . .

# Expose the port the app runs on (Vite defaults to 3000)
EXPOSE 3000

# Start the dev server
CMD ["npm", "run", "dev"]
