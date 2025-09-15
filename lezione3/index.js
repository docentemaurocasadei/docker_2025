const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "db",
  user: process.env.MYSQL_USER,        // lezione_user
  password: process.env.MYSQL_PASSWORD, // lezione_pass
  database: process.env.MYSQL_DB       // lezione3
});

async function initDb() {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  let retries = 10;
  while (retries) {
    try {
      await pool.query(sql);
      console.log("✅ Tabella 'users' pronta (creata se non esiste).");
      break;
    } catch (err) {
      retries -= 1;
      console.log(`⏳ DB non pronto, retry tra 5s... (${retries} tentativi rimasti)`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  if (!retries) {
    console.error("❌ Impossibile connettersi al DB dopo vari tentativi.");
    process.exit(1);
  }
}

app.get('/database', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() as now');
    res.send(`✅ Connessione riuscita! Ora dal DB: ${rows[0].now}`);
  } catch (err) {
    res.status(500).send(`❌ Errore DB: ${err.message}`);
  }
});

// Avvio server solo dopo l'inizializzazione del DB
initDb().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server attivo su http://localhost:${port}`);
  });
});
