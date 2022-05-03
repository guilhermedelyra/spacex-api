FROM node:latest

WORKDIR /api

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

CMD yarn dev
