#!/bin/sh
echo Building using multi-stage build and clear intermediate containers and images...
docker build --no-cache --rm -t ripardo/desafio-01:1.0.0 .
docker image prune -f --filter label=stage=intermediate