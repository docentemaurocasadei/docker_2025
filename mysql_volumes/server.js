// mysql.js
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 3000;

// Config DB da variabili d'ambiente
const DB_HOST = process.env.DB_HOST || 'db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'testdb';
const PROJECT_NAME = process.env.PROJECT_NAME || 'default_project';

let connection;

// Connessione al DB
async function connectDB() {
  connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await connection.query(`USE \`${DB_NAME}\``);
}

// /install → crea tabella se non esiste
app.get('/install', async (req, res) => {
  try {
    await connectDB();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        project_from VARCHAR(255) NOT NULL
      )
    `);
    res.send('Tabella logs creata (se non esiste)');
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore in install');
  }
});

// /log → inserisce un record
app.get('/log', async (req, res) => {
  try {
    if (!connection) await connectDB();
    await connection.query(
      'INSERT INTO logs (project_from) VALUES (?)',
      [PROJECT_NAME]
    );
    res.send(`Log inserito con from='${PROJECT_NAME}'`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore in log');
  }
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
