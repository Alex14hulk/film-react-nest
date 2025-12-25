#!/bin/bash
set -e


psql -v ON_ERROR_STOP=1 --username "$DB_USERNAME" --dbname postgres <<-EOSQL
    GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
EOSQL
