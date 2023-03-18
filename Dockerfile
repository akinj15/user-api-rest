FROM node:alpine

WORKDIR /usr/app

RUN npm i

EXPOSE 3000

CMD [ "npm run start" ]

