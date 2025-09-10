FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./app ./
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
EXPOSE 3005
CMD ["node", "index.js"]
