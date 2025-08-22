FROM alpine:3.20

RUN echo "✅ Dockerfile ALPINE + PHP82 v:1.3"

RUN apk add --no-cache \
    php82 \
    php82-session \
    php82-pdo \
    php82-pdo_mysql \
    php82-mbstring \
    php82-tokenizer \
    php82-ctype \
    php82-xml \
    php82-xmlwriter \
    php82-fileinfo \
    php82-bcmath \
    php82-intl \
    php82-zip \
    php82-curl \
    php82-gd \
    php82-openssl \
    php82-phar \
    php82-zlib \
    php82-dom \
    php82-sqlite3 \
    php82-pdo_sqlite \
    curl \
    git \
    unzip \
    bash

# ✅ Alias "php" → "php82"
RUN ln -s /usr/bin/php82 /usr/bin/php

# ✅ Composer
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

WORKDIR /app/laravel_test

# ✅ Installa Laravel
RUN composer create-project --prefer-dist laravel/laravel .

# ✅ Prepara SQLite
RUN touch database/database.sqlite \
 && chmod 777 database/database.sqlite

EXPOSE 8000

# Copia lo script di entrypoint e rendilo eseguibile
COPY docker-entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

