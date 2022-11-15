FROM node:19

COPY . /api
WORKDIR /api

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js" ]