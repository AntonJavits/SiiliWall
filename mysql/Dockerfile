FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD root

COPY V01_initial_script.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
CMD ["mysqld"]
