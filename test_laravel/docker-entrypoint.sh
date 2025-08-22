#!/bin/sh
set -e

echo "🚀 Avvio container Laravel"

# Genera la key se non esiste
if [ ! -s /app/laravel_test/.env ]; then
  echo "⚙️  Creazione file .env..."
  cp /app/laravel_test/.env.example /app/laravel_test/.env
  php artisan key:generate
fi

# Controlla se il DB è vuoto
if ! php artisan migrate:status >/dev/null 2>&1; then
  echo "⚙️  Primo avvio: eseguo migrate..."
  php artisan migrate --force
else
  echo "✅ Migration già applicate, skip..."
fi

# Avvia il server Laravel
exec php artisan serve --host=0.0.0.0 --port=8000
