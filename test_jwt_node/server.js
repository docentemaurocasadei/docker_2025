const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Percorso assoluto al file di log nel volume
const logFilePath = path.join(__dirname, 'logs', 'log.txt');


const app = express();
const PORT = 3001;
const SECRET_KEY = 'supersegreto'; // usa un valore più sicuro in produzione

app.use(bodyParser.json());

// Mock users
const users = [
  { email: 'admin@admin.it', password: 'padmin1', role: 'admin' },
  { email: 'utente@admin.it', password: 'putente1', role: 'user' },
];

function logToFile(message) {
  const time = new Date().toISOString();
  fs.appendFileSync(logFilePath, `[${time}] ${message}\n`);
}
// POST /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    logToFile(`Tentativo di login fallito per email: ${email}`);
    return res.status(401).json({ error: 'Credenziali non valide' });
  }
    logToFile(`Login riuscito per email: ${email}`);
  const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware per autenticazione
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ error: 'Token mancante' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token non valido' });

    req.user = user;
    next();
  });
}

// GET /profile
app.get('/profile', authenticateToken, (req, res) => {
    logToFile(`Accesso al profilo per: ${req.user.email} (ruolo: ${req.user.role})`);
  if (req.user.role === 'admin') {
    res.json({ message: 'Benvenuto admin' });
  } else {
    res.json({ message: 'Benvenuto utente' });
  }
});

// GET /logout
app.get('/logout', (req, res) => {
    logToFile(`Logout richiesto`);
  // Logout simbolico: lato client bisogna eliminare il token
  res.json({ message: 'Logout effettuato. Elimina il token lato client.' });
});

// GET /public
app.get('/public', (req, res) => {
    logToFile(`Accesso alla rotta pubblica`);
  res.json({ message: 'Non ci sono contenuti non protetti' });
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
