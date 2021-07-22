FROM node:11-alpine

RUN apk update && apk add bash

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3080

CMD ["npm", "run", "dev"]