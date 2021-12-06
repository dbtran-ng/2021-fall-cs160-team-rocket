# Image should be built in the project root directory with -f option
# Example:
# 2021-fall-cs160-team-rocket % docker build -t spartanmeetup:v20211206 -f docker/Dockerfile .

# syntax=docker/dockerfile:1
FROM node:12-alpine

LABEL description="Spartan Meetup"

WORKDIR /app
COPY . /app
RUN npm install
RUN npm install --prefix client/
CMD npm run dev