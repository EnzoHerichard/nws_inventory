FROM node:19 AS api

WORKDIR /api
COPY ./server .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]

FROM node:19 AS app

COPY ./client .
WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]