# Spec a base image
# FROM alpine - small as possible
FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./
# install deps
RUN npm install
COPY ./ ./

# FROM node:alpine
# WORKDIR /usr/app

# default commands
CMD [ "npm", "start" ]
