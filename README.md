# TinyCI Dashboard

# Description

Our Dashboard works as an interface for the user to interact with your Hubs and devices, and a way for our device manufacturer to set configuration files to add capabilities and/or sensors to their devices giving a better experinece to the end user.
All of this is powered by an Angular Single Page Application, written in typescript and an AWS IoT server running Mosquitto.

# Requirements

To run this software you'll need:
- A MQTT broker.
- An ESP32 running the [esp32-homebridge](https://github.com/matteogastaldello/esp32-HomeBridge).

For the edge-devices to be connected you can reference the HomeBridge README.

You'll also need `Angular CLI` installed on your device to run the dashboard locally, otherwise you can deploy - with little to no modifications - this repo on [Vercel](vercel.com).

# Technologies

With this state of the art platform we implemented a refined UX for the end user, as well as the edge device manifacturer. Using our mosquitto instance, that's running on our AWS E2C IoT instance with Ubuntu 22.04, we're able to connect to our edge-devices, get data and send commands from anywhere in the world.

## MQTT broker and AWS

It was imperative for our communication system to be as easy to use for the end users as possibile, thats why we decided to setup a our own remote broker using [mosquitto](https://mosquitto.org/) running on an AWS instance with Ubuntu 22.04 as OS. We decided to use mosquitto not only beacuse we got to know it during class, but also because it was one of the few lightweight but efficient solutions we were able to find, giving us the performance we needed without consuming a high volume of resources.

### Why AWS?

When we firstly started this project we planned on a featuring OTA (over the air updates) and after a lot of reaserch on how to best implement it we decided on AWS E2C IoT, which are instances configure with the purpose of IoT applications. After a lot of troubleshooting on making the broker properly work, we started working on a piece of custom software that was able to get any .ino/.c/.cpp compile it, link it and send the binary file back to the device but was then put on hold to concentrate on the main focus of the project, given that ammount of work was enormous, but we could consider it for feature improvements.

# How does it work?

We can divide the features of our dashboard in two main categories:

- End-user focused
- Manifacturer focused

Let's dive firstly into the first category with what a typical user does at it's first utilization and let's analyze it step by step:

Firstly the user is presented with a 6 digit pin, that is provided with the hub, that logs him in to the dashboard in which he has an overview all of the features available to him as shown in picture:


## Register

For registering a device we must first connect to their Hub, in fact we send a request throught our MQTT. Here are the steps from the dashboard.

| Description | From To  | MQTT |
|---|---|---|
|  This message is sent everytime the TinyCI Dashboard is looking for Hubs | Dashboard &rarr; MQTT Broker &rarr; HUB | ` esp-firstConfiguration : { "mode" : "discovery" } `|
| Once recived the discovery message the Hub responds with its details ( `id` is the MAC address and  ` device-name` is set by the manifacturer)   | Hub &rarr; MQTT broker &rarr; Dashboard | `esp-firstConfiguration: { "device-name" : "ESP32" , "id" : "C0:49:EF:CD:20:CC" }`|
| We set the topic to esp + hub.id and set it to discovery mode, so that the hub scans it's Wi-Fi network thourgh web sockets and returns the edge devices available | Dashboard &rarr; MQTT Broker &rarr; HUB |  ` esp-C0:49:EF:CD:20:CC : { "mode" : "discovery" , "device" : "C0:49:EF:CD:20:CC" } `|
| Returns that the device has been registered to the user | Hub &rarr; MQTT broker &rarr; Dashboard |  `esp-C0:49:EF:CD:20:CC : { "device-name" : "MSP432" , "id" : "C0:49:EF:CD:20:CC-MSP432", "status" : "registered" } `|

## Manage boards



## Live Data

## Board setup by manifacturer

# Problems during development

# Authors and Acknwoledgments

# Project Layout

```bash
MqttDashboard
├── README.md
├── angular.json
├── karma.conf.js
├── src
│   ├── app
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── core
│   │   │   ├── components
│   │   │   │   ├── footer-partial
│   │   │   │   │   ├── footer-partial.component.html
│   │   │   │   │   ├── footer-partial.component.scss
│   │   │   │   │   ├── footer-partial.component.spec.ts
│   │   │   │   │   └── footer-partial.component.ts
│   │   │   │   └── header-partial
│   │   │   │       ├── header-partial.component.html
│   │   │   │       ├── header-partial.component.scss
│   │   │   │       ├── header-partial.component.spec.ts
│   │   │   │       └── header-partial.component.ts
│   │   │   ├── core.pages.module.ts
│   │   │   ├── core.router.module.ts
│   │   │   ├── guards
│   │   │   │   ├── user.guard.spec.ts
│   │   │   │   └── user.guard.ts
│   │   │   ├── interceptors
│   │   │   │   ├── http-header.interceptor.ts
│   │   │   │   └── http-retry.interceptor.ts
│   │   │   ├── models
│   │   │   │   ├── api
│   │   │   │   │   ├── board.model.ts
│   │   │   │   │   ├── error.model.ts
│   │   │   │   │   ├── field.model.ts
│   │   │   │   │   ├── firmware.model.ts
│   │   │   │   │   ├── query-list.model.ts
│   │   │   │   │   └── query.model.ts
│   │   │   │   ├── auth
│   │   │   │   │   └── user-profile.model.ts
│   │   │   │   └── logger
│   │   │   │       └── log-entry.model.ts
│   │   │   ├── pages
│   │   │   │   ├── board-firmware-page
│   │   │   │   │   ├── board-firmware.component.html
│   │   │   │   │   ├── board-firmware.component.scss
│   │   │   │   │   ├── board-firmware.component.ts
│   │   │   │   │   └── board-firmware.module.ts
│   │   │   │   ├── board-manage-page
│   │   │   │   │   ├── board-manage.component.html
│   │   │   │   │   ├── board-manage.component.scss
│   │   │   │   │   ├── board-manage.component.ts
│   │   │   │   │   └── board-manage.module.ts
│   │   │   │   ├── board-setup-page
│   │   │   │   │   ├── board-setup.component.html
│   │   │   │   │   ├── board-setup.component.scss
│   │   │   │   │   ├── board-setup.component.spec.ts
│   │   │   │   │   ├── board-setup.component.ts
│   │   │   │   │   └── board-setup.module.ts
│   │   │   │   └── welcome-page
│   │   │   │       ├── welcome-page.component.html
│   │   │   │       ├── welcome-page.component.scss
│   │   │   │       ├── welcome-page.component.spec.ts
│   │   │   │       ├── welcome-page.component.ts
│   │   │   │       └── welcome-page.module.ts
│   │   │   ├── publishers
│   │   │   │   ├── abstract-log.publisher.ts
│   │   │   │   └── log-console.publisher.ts
│   │   │   ├── services
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── log-publishers.service.ts
│   │   │   │   └── logger.service.ts
│   │   │   └── store
│   │   │       ├── actions
│   │   │       │   └── auth.actions.ts
│   │   │       ├── reducers
│   │   │       │   ├── auth.reducer.ts
│   │   │       │   └── index.ts
│   │   │       └── selectors
│   │   │           └── auth.selectors.ts
│   │   ├── features
│   │   │   └── user
│   │   │       ├── pages
│   │   │       │   ├── user-home-page
│   │   │       │   │   ├── user-home-page.component.html
│   │   │       │   │   ├── user-home-page.component.scss
│   │   │       │   │   ├── user-home-page.component.spec.ts
│   │   │       │   │   ├── user-home-page.component.ts
│   │   │       │   │   └── user-home-page.module.ts
│   │   │       │   ├── user-page1-page
│   │   │       │   │   ├── user-page1-page.component.html
│   │   │       │   │   ├── user-page1-page.component.scss
│   │   │       │   │   ├── user-page1-page.component.spec.ts
│   │   │       │   │   ├── user-page1-page.component.ts
│   │   │       │   │   └── user-page1-page.module.ts
│   │   │       │   └── user-page2-page
│   │   │       │       ├── user-page2-page.component.html
│   │   │       │       ├── user-page2-page.component.scss
│   │   │       │       ├── user-page2-page.component.spec.ts
│   │   │       │       ├── user-page2-page.component.ts
│   │   │       │       └── user-page2-page.module.ts
│   │   │       ├── user.pages.module.ts
│   │   │       └── user.router.module.ts
│   │   └── utils
│   │       ├── database.types.ts
│   │       └── initSupabase.ts
│   ├── assets
│   │   ├── i18n
│   │   │   ├── en-US.json
│   │   │   └── it-IT.json
│   │   └── images
│   │       ├── header_logo_unitn_en.png
│   │       ├── header_logo_unitn_it.png
│   │       ├── logo_unitn_en.png
│   │       └── logo_unitn_it.png
│   ├── environments
│   │   ├── environment.prod.ts
│   │   ├── environment.test.ts
│   │   └── environment.ts
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   ├── test.ts
│   └── web.config
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── tslint.json
```

# External Software

## Using AWS E2C IoT



### Setting up AWS for mosquitto



## Supabase

# Usage


# License




## MQTT Broker

