FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g serve --save

RUN npm ci

COPY . .

RUN npm run build


EXPOSE 3000


