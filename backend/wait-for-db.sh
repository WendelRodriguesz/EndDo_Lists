#!/bin/sh
set -e

host="$1"
shift
cmd="$@"

until pg_isready -h "$host" -p 5432 > /dev/null 2>&1; do
  echo "Postgres ainda não está pronto - tentando novamente em 1 segundo..."
  sleep 1
done

echo "Postgres está pronto - iniciando o servidor"
exec $cmd
