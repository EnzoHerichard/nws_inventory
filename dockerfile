FROM node:latest


ADD . /app/
WORKDIR /app/client/

RUN npm install

EXPOSE 3000