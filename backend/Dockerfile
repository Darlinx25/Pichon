FROM php:8.3-cli

RUN apt-get update && apt-get install -y git unzip && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock* ./
RUN composer install --no-interaction --optimize-autoloader

COPY . .

EXPOSE 8081

CMD ["sh", "-c", "cp -r /app /app_bak; composer install --no-interaction --optimize-autoloader && php server.php"]