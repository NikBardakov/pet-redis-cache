set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER docker;
    CREATE DATABASE redis_development;
    GRANT ALL PRIVILEGES ON DATABASE redis_development TO docker;
    CREATE DATABASE redis_test;
    GRANT ALL PRIVILEGES ON DATABASE redis_test TO docker;

EOSQL


