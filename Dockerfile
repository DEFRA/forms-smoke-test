FROM node:21-alpine

ENV TZ="Europe/London"

USER root

RUN apk add --no-cache \
    openjdk17-jre-headless \
    curl \
    aws-cli

WORKDIR /home/node/test

COPY --chown=node:node . .

USER node

RUN npm install

ENTRYPOINT [ "./entrypoint.sh" ]
