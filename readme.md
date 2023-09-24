
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
4. **test** - measurement container which demonstrates work of cached and non-cached data.
   
   Look at this container log to get and compare results

## RUN NODE JS APPLICATION LOCALY 
To simplify debbuging you can run redis and db dockers, and launch application and test application localy. For it you need run the following commands

For main application launching:
```bash
cd app
npx supervisor ./bin/www
```

For test application launching:
```bash
cd test-app
node app.js
```

## RESULTS

```
$ node app.js
2023-09-24 13:25:35 Generating data is starting
2023-09-24 13:25:38 Process has taken 2989 ms
2023-09-24 13:25:38 The first trying to get data with empty cache
2023-09-24 13:25:39 Process has taken 1452ms
2023-09-24 13:25:39 The second trying to get data with fullfill cache
2023-09-24 13:25:40 Process has taken 588ms
2023-09-24 13:25:40 The therd trying to get data in order to confirm the result
2023-09-24 13:25:40 Process has taken 509ms
2023-09-24 13:25:40 The first trying to get data not using cache
2023-09-24 13:25:41 Process has taken 1182ms
2023-09-24 13:25:41 The second trying to get data not using cache in order to confirm the result
2023-09-24 13:25:42 Process has taken 1171ms
```
### INSTEAD OF CONCLUSION
  * Average time to get the same data from **Postgres** DB **1,2s**
  * Time to get the same data from **Postgres** DB after checking the cache **1,5s** (+25% in comparison with just postgresql query)
  * Average time to get the same data from **Redis** cache **0,5s** (240% faster than postgresql)

p.s. This pet project just show elementary operations. If initial getting information is more complicated, cache using will show even more profit




