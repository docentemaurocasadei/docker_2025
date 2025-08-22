# Usa Node LTS come base (puoi mettere anche :20 se vuoi l’ultima major)
FROM node:18

# Imposta directory di lavoro dentro il container
WORKDIR /usr/src/app

# Copia i file di definizione pacchetti
COPY package*.json ./

# Installa le dipendenze
RUN npm install --production

# Copia tutto il resto del progetto
COPY . .

# Espone la porta usata da Express
EXPOSE 3000

# Avvia l’applicazione
CMD ["node", "server.js"]
