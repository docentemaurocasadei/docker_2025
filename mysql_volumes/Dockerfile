FROM node:18

# directory app
WORKDIR /usr/src/app

# copia dipendenze e codice
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
