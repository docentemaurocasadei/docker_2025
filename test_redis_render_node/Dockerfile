FROM node:18-alpine

# Crea una cartella per l’app
WORKDIR /usr/src/app

# Copia package.json e installa dipendenze
COPY package*.json ./
RUN npm install --production

# Copia il resto del codice (incluso app.js)
COPY . .

# Espone la porta dell’app
EXPOSE 3000

# Comando di avvio
CMD ["npm", "start"]
