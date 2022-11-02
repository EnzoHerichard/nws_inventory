FROM node:latest

COPY ./client /app
WORKDIR /app

RUN npm install

EXPOSE 3000


