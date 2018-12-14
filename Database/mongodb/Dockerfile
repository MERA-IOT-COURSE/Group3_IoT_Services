FROM ubuntu:16.04 as scripts

WORKDIR /scripts

RUN apt-get update \
    && apt-get -y install dos2unix

COPY init-mongo.sh .
RUN dos2unix init-mongo.sh
RUN chmod +x init-mongo.sh

FROM mongo

COPY --from=scripts /scripts /docker-entrypoint-initdb.d
