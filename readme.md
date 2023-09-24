
# PET REDIS CACHE PROJECT
This project was created to try using Redis as cache storage

## DOCKER STRUCTURE
This project launches several docker containers by docker-compose

List of the docker containers:
1. **db** - Postgres database container
2. **redis**- Redis container as a cache storage
3. **application**- main application cointainer witch works with DB and the cache storage . This application has several endpoints
  * POST /postgresdata - add a row to a table
```bash
curl --location 'localhost:8080/postgresdata' \
--header 'Content-Type: application/json' \
--data '{
    "uuid": "bla-bla"
}'
```
  * GET /postgresdata - get all rows from the table(using just PosgresQL)
  * GET /postgresdata/:id - get a row by id from PostgesQL
  * GET /cacheddata/:id - firstly, application tries to get the row from cache storage, if there aren't the row in cache it's got from PostgresQL DB and saved to cache
4. **test** - measurement container which demonstrates work of cached and non-cached data
   Look at this container log to get and compare results

## RUN NODE JS APPLICATION LOCALY
```bash
cd app
npx supervisor ./bin/www
```
