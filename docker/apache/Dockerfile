FROM php:8.3-apache
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data   # ← NUEVA
RUN a2enmod rewrite proxy proxy_wstunnel proxy_http
RUN docker-php-ext-install mysqli pdo pdo_mysql
COPY vhost.conf /etc/apache2/sites-available/000-default.conf