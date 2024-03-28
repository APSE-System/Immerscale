FROM node:latest as builder
RUN npm install -g http-server
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

FROM builder as dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

FROM builder as build
RUN npm run build
EXPOSE 8080
CMD ["http-server", "dist"]