
# PET REDIS CACHE PROJECT
This project was created to try using Redis as cache storage

## DOCKER STRUCTURE
This project launches several docker containers by docker-compose

List of the docker containers:
-*db* - Postgres database container
-*redis*- Redis container
-*application*- main application cointainer. This application has several endpoints
--POST /postgresdata - add a row to a table
```bash
curl --location 'localhost:8080/postgresdata' \
--header 'Content-Type: application/json' \
--data '{
    "uuid": "bla-bla"
}'
```
--GET /postgresdata - get all rows from the table(using just PosgresQL)
--GET /postgresdata/:id - get a row by id from PostgesQL
--GET /cacheddata/:id - firstly, application tries to get the row from cache storage, if there aren't the row in cache it's got from PostgresQL DB and saved to cache
  
## RUN NODE JS APPLICATION LOCALY
```bash
cd app
npx supervisor ./bin/www
```
