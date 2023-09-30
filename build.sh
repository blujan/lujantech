#!/bin/sh
#
docker buildx build --platform linux/amd64 . --tag lujantech:latest
