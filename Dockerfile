# Use an official Node.js runtime as the base image
FROM node:18-alpine

RUN npm install -g npm
# Set the working directory in the container

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm i

COPY . /app

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]