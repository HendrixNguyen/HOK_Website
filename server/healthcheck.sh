#!/usr/bin/env bash

if ! nc -z localhost 8080; then
  echo "Checking Backend ... Failed !"
  exit 1
fi
