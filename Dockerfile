FROM node:alpine

COPY . .

RUN npm i

CMD node src/