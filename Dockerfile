FROM node:21-alpine

WORKDIR /client

COPY . .
RUN npm run build