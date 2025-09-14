const express = require("express");
const mysql = require("mysql2/promise"); // uso mysql2 con supporto Promise

const app = express();
const port = 3000;

// Configurazione MySQL dalle variabili d’ambiente
const dbConfig = {
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "testdb",
  port: process.env.MYSQL_PORT || 3306
};

// Endpoint di test
app.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query("SELECT NOW() AS currentTime");
    await connection.end();

    res.send(`✅ Connessione a MySQL riuscita! Ora sul DB: ${rows[0].currentTime}`);
  } catch (err) {
    console.error("❌ Errore connessione MySQL:", err);
    res.status(500).send("Errore connessione MySQL");
  }
});

// Avvio server
app.listen(port, () => {
  console.log(`🚀 App Node.js in ascolto su http://localhost:${port}`);
});
