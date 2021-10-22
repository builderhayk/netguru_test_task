FROM node:16.9.1
WORKDIR /app
COPY ["package*.json", ".env", "./"]
COPY [".babelrc", "./"]
RUN npm install
COPY ./src ./src
RUN npm run build


FROM node:16.9.1
WORKDIR /app
COPY ["package*.json", ".env", "./"]
COPY [".babelrc", "./"]
RUN npm install
COPY --from=0 /app/dist ./dist
EXPOSE 8080
CMD [ "node", "dist/index.js" ]
