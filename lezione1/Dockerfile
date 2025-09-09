FROM nginx:latest
COPY images/businessman.jpg /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
# docker build -t ss_nginx .