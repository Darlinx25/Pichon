
<img width="1912" height="914" alt="Ejemplo" src="https://github.com/user-attachments/assets/b705580f-aa1f-43fa-ba81-1b910d0e0a62" />


## Levantar servidor

Desde la raiz del proyecto para levantar, mySQL, phpMyAdmin y el servidor WebSocket
```
docker compose up --build
```

## Para levantar angular desde Pichon/frontend

#### Para desarrollo
```
ng serve --host 0.0.0.0                                               
```
#### Para produccion
```
ng serve --configuration production --host 0.0.0.0
```
### Permisos necesarios
```
sudo chmod -R 777 /var/www/html/Pichon
sudo chown -R $USER:$USER /var/www/html
```
### Acceso a Phpmyadmin

- http://127.0.0.1:8080/

### Librerias utilizadas

- http://socketo.me/docs


