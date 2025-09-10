const express = require('express');
const mysql = require('mysql2/promise');

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

const app = express();
const port = process.env.PORT || 3005;

// Creiamo un pool (meglio per richieste multiple)
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
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

app.get('/', async (req, res) => {
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
