# Usa una base image con Node
FROM node:18

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file
COPY . .

# Espone la porta 3001
EXPOSE 3001

# Comando di avvio
CMD ["node", "server.js"]
