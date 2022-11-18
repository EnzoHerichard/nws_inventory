FROM node:19

COPY ./client .
WORKDIR /app

RUN npm install

EXPOSE 3000


