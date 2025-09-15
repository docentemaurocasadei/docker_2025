FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
EXPOSE 3000
CMD ["node", "index.js"]
