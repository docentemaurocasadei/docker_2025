const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
// 👉 questa riga serve i file statici dalla cartella public
app.use(express.static('public'));

// 🔹 Pool MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpass',
  database: process.env.DB_NAME || 'testdb'
});

// 🔹 Middleware per autenticazione JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 🔹 /install → crea tabella users e admin di default
app.get('/install', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        password VARCHAR(255),
        firstname VARCHAR(50),
        lastname VARCHAR(50)
      );
    `);

    // Inserisce admin se non esiste
    const [rows] = await pool.query("SELECT * FROM users WHERE username = 'admin'");
    if (rows.length === 0) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await pool.query(
        "INSERT INTO users (username, password, firstname, lastname) VALUES (?, ?, ?, ?)",
        ['admin', hashedPassword, 'Default', 'Admin']
      );
    }

    res.json({ message: "Users table ready, admin user created (username=admin, password=admin)" });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// 🔹 /login → ritorna token JWT
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// 🔹 /profile → ritorna nome e cognome se autenticato
app.get('/profile', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT firstname, lastname FROM users WHERE id = ?", [req.user.id]);
    if (rows.length === 0) return res.sendStatus(404);

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// 🔹 Avvio server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
