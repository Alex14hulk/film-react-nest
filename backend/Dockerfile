FROM node:23.6.0-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]