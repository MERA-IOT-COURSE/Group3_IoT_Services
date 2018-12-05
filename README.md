# GROUP 3 - IoT Services | [![Build Status](https://travis-ci.org/MERA-IOT-COURSE/Group3_IoT_Services.svg?branch=master)](https://travis-ci.org/MERA-IOT-COURSE/Group3_IoT_Services)

## The main information:

### The repository

The repository includes _seven_ modules:
* **Device** - the implementation to run on a RaspberryPi device;
* **Server** - the implementation to run on an available host;
* **Models** - the implementation of DAL models for devices, sensors and actions;
* **Protocol** - the instrument for a device and a server communication, requires a MQTT Broker instance;
* **Utils** - the module of utils;
* **Broker** - the docker-compose configuration with default settings for a MQTT Broker instance running;
* **Database** - the docker configuration for MongoDB and Mongo Express instances running.

### The environment/requirements:

* node.js - v10.14.1
* npm - 6.4.1
* Docker Engine - 18.09.0
* Docker Compose - 1.23.2

## Useful commands:

Some useful commands are described in this block. 

### MQTT Broker

#### How to run a MQTT Broker instance?

Change directory to relocate into Broker folder:

```console
user@host:Group3_IoT_Services$ cd Broker
```

Build container if it's needed:

```console
user@host:Broker$ docker-compose build
```

Up container (without output):

```console
user@host:Broker$ docker-compose up -d
```

Down container:
```console
user@host:Broker$ docker-compose down
```

### MongoDB

#### 1. How to run a MongoDB instance without Mongo Express?

Change directory to relocate into Database folder:

```console
user@host:Group3_IoT_Services$ cd Database
```

Build container if it's needed:

```console
user@host:Database$ docker-compose build
```

Up container (without output):

```console
user@host:Database$ docker-compose run -d mongodb
```

Down container:

```console
user@host:Database$ docker-compose down
```

#### 2. How to run a MongoDB instance with Mongo Express?

Change directory to relocate into Database folder:

```console
user@host:Group3_IoT_Services$ cd Database
```

Build container if it's needed:

```console
user@host:Database$ docker-compose build
```

Up containers (without output):

```console
user@host:Database$ docker-compose up -d
```

Down container:

```console
user@host:Database$ docker-compose down
```

#### 3. How to run Mongo Shell?

When step _1_ or _2_ is performed, you can run a special shell for MongoDB:

```console
user@host:Database$ docker exec -t -i mongodb mongo
```

#### 4. How to run Mongo Express?

When step _2_ is performed, you can open link via browser to watch and configure DB data:

> http://localhost:8081

### NodeJS

#### 1. How to install/unistall/reinstall all modules?

Install all JS modules via npm (it's worth using in the first time):

```console
user@host:Group3_IoT_Services$ npm run install-all
```

Remove all dependencies and lock-files in all JS modules:

```console
user@host:Group3_IoT_Services$ npm run uninstall-all
```

Install JS modules after removing of old dependencies:

```console
user@host:Group3_IoT_Services$ npm run reinstall-all
```

#### 2. How to run unit tests?

Run unit tests in all JS modules:

```console
user@host:Group3_IoT_Services$ npm test
```

#### 3. How to run lint?

Run lint for JavaScript files in all JS modules:

```console
user@host:Group3_IoT_Services$ npm run lint
```
