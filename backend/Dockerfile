#  Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

#Expose port 5000 (or whatever your backend runs on)
EXPOSE 5000

#Start the server
CMD ["npm", "start"]
