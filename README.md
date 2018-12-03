# GROUP 3 - IoT Services | [![Build Status](https://travis-ci.org/MERA-IOT-COURSE/Group3_IoT_Services.svg?branch=master)](https://travis-ci.org/MERA-IOT-COURSE/Group3_IoT_Services)

## The main information:

### The repository

The repository includes _six_ modules:
* **Device** - the implementation to run on a RaspberryPi device;
* **Server** - the implementation to run on an available host;
* **Models** - the implementation of DAL models for devices, sensors and actions;
* **Protocol** - the instrument for a device and a server communication, requires a MQTT Broker instance;
* **Utils** - the module of utils;
* **Broker** - the docker-compose configuration with default settings for MQTT Broker instances running.

### The environment/requirements:

* node.js - v10.14.1
* npm - 6.4.1
* Docker Engine - 18.09.0
* Docker Compose - 1.23.1

## Useful commands:

Some useful commands are described in this block. 

### How to run a MQTT Broker instance?

Change directory to relocate into Broker folder:

> **Group3_IoT_Services**> cd Broker

Up Docker Compose container (without output):

> **Broker**> docker-compose up -d

### How to install/unistall/reinstall all modules?

Install all JS modules via npm (it's worth using in the first time):

> **Group3_IoT_Services**> npm run install-all

Remove all dependencies and lock-files in all JS modules:

> **Group3_IoT_Services**> npm run uninstall-all

Install JS modules after removing of old dependencies:

> **Group3_IoT_Services**> npm run reinstall-all

### How to run unit tests?

Run unit tests in all JS modules:

> **Group3_IoT_Services**> npm test

### How to run lint?

Run lint for JavaScript files in all JS modules:

> **Group3_IoT_Services**> npm run lint
