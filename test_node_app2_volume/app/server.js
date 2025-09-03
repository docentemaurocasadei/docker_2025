import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World volume 2!');
});

// Percorso assoluto nel container (montato su volume)
const filePath = path.join('/app/storage', 'log.txt');

app.post('/write', (req, res) => {
  try {
    const now = new Date().toISOString();
    const data = req.body.data || '[nessun dato]';
    const line = `Scrittura "${data}" effettuata alle ${now}\n`;

    fs.appendFileSync(filePath, line, 'utf8');

    res.send('Scrittura completata!');
  } catch (error) {
    console.error('Errore scrittura:', error);
    res.status(500).send('Errore durante la scrittura');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});