// server.js
const express = require("express");
const app = express();
const PORT = 5511;

// Middleware per leggere JSON e urlencoded body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotta GET con query string: /reverse?word=ciao
app.get("/reverse", (req, res) => {
  const word = req.query.word;
  if (!word) {
    return res.status(400).json({ error: "Parametro 'word' mancante" });
  }

  const reversed = word.split("").reverse().join("");
  res.json({ original: word, reversed });
});

// Rotta POST con body JSON: { "word": "ciao" }
app.post("/reverse", (req, res) => {
  const word = req.body.word;
  if (!word) {
    return res.status(400).json({ error: "Parametro 'word' mancante" });
  }

  const reversed = word.split("").reverse().join("");
  res.json({ original: word, reversed });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`🚀 Server avviato su http://localhost:${PORT}`);
});
