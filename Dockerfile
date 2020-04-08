FROM node:12-alpine

LABEL name "DogeBot"
LABEL version "1.0.0"
LABEL maintainer "KelviNosse <kelvinosse@gmail.com>"

ARG VERSION
ENV NODE_ENV= \
    COMMAND_PREFIX= \
    OWNER= \
    BOT_ID= \
    BOT_TOKEN= \
    TYPE= \
    LOG_LEVEL= \
    DEBUG= \
    VERSION=$VERSION

WORKDIR /usr/src/dogebot
COPY package.json package-lock.json ./
RUN apk add --update \
    && apk add --no-cache --virtual .build-deps git curl python g++ make \
    && npm install \
    && apk del .build-deps

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]
