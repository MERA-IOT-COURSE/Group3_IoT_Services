FROM ubuntu:16.04 as scripts

WORKDIR /scripts

RUN apt-get update \
    && apt-get -y install curl

ENV DOCKERIZE_VERSION v0.6.1
ENV DOCKERIZE_RELEASE_LINK https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN curl -L $DOCKERIZE_RELEASE_LINK > dockerize.tar.gz \
    && tar -C /scripts -xzvf dockerize.tar.gz \
    && rm dockerize.tar.gz

FROM mongo-express

COPY --from=scripts /scripts .
