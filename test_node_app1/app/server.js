import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Ciao, webservice pubblicato da Mauro!');
});

app.listen(3000, () => {
  console.log('Mauro: Server in esecuzione sulla porta 3000');
});