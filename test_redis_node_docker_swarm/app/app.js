const express = require("express");
const { createClient } = require("redis");

const app = express();

// client Redis con nuova sintassi (redis@4.x)
const client = createClient({
  url: "redis://redis:6379"   // "redis" è il nome del servizio nello stack
});

client.on("error", (err) => {
  console.error("Errore Redis:", err);
});

// Connessione a Redis (async/await)
(async () => {
  try {
    await client.connect();
    console.log("Connesso a Redis");
  } catch (err) {
    console.error("Errore durante la connessione a Redis:", err);
    process.exit(1); // Se non riesce a connettersi, crasha subito
  }
})();

app.get("/", async (req, res) => {
  try {
    const counter = await client.incr("counter");
    res.send(`Visite totali: ${counter}`);
  } catch (err) {
    console.error("Errore Redis:", err);
    res.status(500).send("Redis non disponibile");
  }
});

app.listen(3000, () => {
  console.log("App Node.js in ascolto su porta 3000");
});
