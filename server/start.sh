#!/usr/bin/env bash

sudo -u admin -g admin -E yarn start &
MAIN_PID=$!

while ! nc -z localhost 8080; do
  kill -0 ${MAIN_PID}
  sleep 1
done
