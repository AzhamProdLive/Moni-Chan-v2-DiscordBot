# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the Docker image
COPY package*.json ./

# Install the application dependencies in the Docker image
RUN npm install

# Copy the rest of the application code to the Docker image
COPY . .

# Define the command to run the application
CMD [ "node", "index.js" ]