const express = require("express");
const { createClient } = require("redis");

const app = express();

const client = createClient({
  url: process.env.REDIS_URL
});

client.on("error", (err) => console.error("Errore Redis:", err));

(async () => {
  try {
    await client.connect();
    console.log("Connesso a Redis su Render (ss-redis)");
  } catch (err) {
    console.error("Errore connessione Redis:", err);
    process.exit(1);
  }
})();

app.get("/", async (req, res) => {
  try {
    const counter = await client.incr("counter");
    res.send(`Visite totali: ${counter}`);
  } catch (err) {
    res.status(500).send("Redis non disponibile");
  }
});

app.listen(3000, () => {
  console.log("App Node.js in ascolto su porta 3000");
});
