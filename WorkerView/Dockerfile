FROM node:19.2 as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

FROM builder as dev
EXPOSE 8080
CMD ["npm", "run", "dev"]

FROM builder as build
RUN npm install -g http-server
RUN npm run build
EXPOSE 8080
CMD ["http-server", "dist"]
