-- Crea tabella stores se non esiste
CREATE TABLE IF NOT EXISTS stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo VARCHAR(255),
    message TEXT,
    site VARCHAR(255),
    fb_url VARCHAR(255),
    ig_url VARCHAR(255)
);

-- Inserisce dati demo
INSERT INTO stores (name, logo, message, site, fb_url, ig_url) VALUES
('Negozio Moda', 'https://example.com/logo1.png', 'Benvenuti nel nostro shop di moda!', 'https://moda.it', 'https://facebook.com/moda', 'https://instagram.com/moda'),
('Tech Store', 'https://example.com/logo2.png', 'Tecnologia e innovazione ogni giorno.', 'https://techstore.it', 'https://facebook.com/techstore', 'https://instagram.com/techstore'),
('Gioielli Eleganti', 'https://example.com/logo3.png', 'Scopri i nostri gioielli unici.', 'https://gioielli.it', 'https://facebook.com/gioielli', 'https://instagram.com/gioielli');
