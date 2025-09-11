// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Route /benvenuto
app.get('/benvenuto', (req, res) => {
  res.send('Benvenuto al corso Docker!!');
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
