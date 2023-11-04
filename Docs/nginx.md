# Nginx

## Install Nginx

`sudo apt-get update`
`sudo apt-get install nginx`

## Configuring Nginx

1. Create a new configuration file
   `sudo nano /etc/nginx/sites-available/example.com.conf`

2. Edit the configuration file something like:

   ```
    server {
        listen 80;
        server_name example.com www.example.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
   ```
3. Create a symbolic link to the configuration file in /etc/nginx/sites-enabled:

    ```sudo ln -s /etc/nginx/sites-available/example.com.conf /etc/nginx/sites-enabled/```

4. Verify the syntax
    ```sudo nginx -t```

5. Reload nginx
    ```systemctl reload nginx```