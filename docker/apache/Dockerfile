FROM php:8.3-apache
RUN usermod -u 1000 www-data && groupmod -g 1000 www-data   # ← NUEVA
RUN a2enmod rewrite proxy proxy_wstunnel proxy_http
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN echo "upload_max_filesize = 100M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/uploads.ini
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

RUN apt-get update && apt-get install -y msmtp msmtp-mta && rm -rf /var/lib/apt/lists/*
COPY msmtprc /etc/msmtprc
RUN echo "sendmail_path = /usr/bin/msmtp -t" > /usr/local/etc/php/conf.d/sendmail.ini
