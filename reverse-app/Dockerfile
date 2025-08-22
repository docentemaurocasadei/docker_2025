# Usa un'immagine Node.js ufficiale
FROM node:20-alpine

# Imposta la cartella di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json (se presente)
COPY package*.json ./

# Installa le dipendenze
RUN npm install --production

# Copia il resto del codice
COPY . .

# Espone la porta 5511
EXPOSE 5511

# Avvia il server
CMD ["npm", "start"]
