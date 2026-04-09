FROM nginxinc/nginx-unprivileged
COPY . /usr/share/nginx/html
EXPOSE 3000
