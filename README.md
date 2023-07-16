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
│   │   │   │   ├── live-data-page
│   │   │   │   │   ├── live-data-page.component.html
│   │   │   │   │   ├── live-data-page.component.scss
│   │   │   │   │   ├── live-data-page.component.spec.ts
│   │   │   │   │   ├── live-data-page.component.ts
│   │   │   │   │   └── live-data-page.module.ts
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


# How does it work?

We can divide the features of our dashboard in two main categories:

- End-user focused
- Manifacturer focused

Let's dive firstly into the first category with what a typical user does at it's first utilization and let's analyze it step by step:

Firstly the user is presented with a 6 digit pin, that is provided with the hub, that logs him in to the dashboard in which he has an overview all of the features available to him as shown in picture:


## Register

To register a device we must first connect to their Hub, in fact we send a request throught our MQTT. Here are the steps from the dashboard.

| MQTT | From To  | Description |
|---|---|---|
| ` esp-firstConfiguration : { "mode" : "discovery" } ` | Dashboard &rarr; MQTT Broker &rarr; HUB |  This message is sent everytime the TinyCI Dashboard is looking for Hubs.|
| `esp-firstConfiguration: { "device-name" : "ESP32" , "id" : "C0:49:EF:CD:20:CC" }`  | Hub &rarr; MQTT broker &rarr; Dashboard | Once recived the discovery message the Hub responds with its details ( `id` is the MAC address and  ` device-name` is set by the manifacturer).|
| ` esp-C0:49:EF:CD:20:CC : { "mode" : "discovery" , "device" : "C0:49:EF:CD:20:CC" } ` | Dashboard &rarr; MQTT Broker &rarr; HUB | We set the topic to esp + hub.id and set it to discovery mode, so that the hub scans it's Wi-Fi network thourgh web sockets and returns the edge devices available.|
| `esp-C0:49:EF:CD:20:CC : { "device-name" : "MSP432" , "id" : "C0:49:EF:CD:20:CC-MSP432", "status" : "registered" } ` | Hub &rarr; MQTT broker &rarr; Dashboard | Returns that the device has been registered to the user.|

## Manage devices

We also have the ability of managing devices, if the manifacturer has provided our propretary JSON file

| MQTT | From To  | Description |
|---|---|---|
| ` esp-firstConfiguration : { "mode" : "discovery" } ` | Dashboard &rarr; MQTT Broker &rarr; HUB |  This message is sent everytime the TinyCI Dashboard is looking for Hubs.|
| `esp-firstConfiguration: { "device-name" : "ESP32" , "id" : "C0:49:EF:CD:20:CC" }`  | Hub &rarr; MQTT broker &rarr; Dashboard | Once recived the discovery message the Hub responds with its details ( `id` is the MAC address and  ` device-name` is set by the manifacturer).|
| ` esp-C0:49:EF:CD:20:CC : { "mode" : "discovery" , "device" : "C0:49:EF:CD:20:CC" } ` | Dashboard &rarr; MQTT Broker &rarr; HUB | We set the topic to esp + hub.id and set it to discovery mode, so that the hub scans it's Wi-Fi network thourgh web sockets and returns the edge devices available.|
| `esp-C0:49:EF:CD:20:CC : { "device-name" : "MSP432" , "id" : "C0:49:EF:CD:20:CC-MSP432", "status" : "registered" } ` | Hub &rarr; MQTT broker &rarr; Dashboard | Returns that the device has been registered to the user.|

## Live Data

| MQTT | From To  | Description |
|---|---|---|
| ` esp-C0:49:EF:CD:20:CC : { "mode" : "discovery" } ` | Dashboard &rarr; MQTT Broker &rarr; HUB |  This message is sent everytime the TinyCI Dashboard is looking for Hubs.|
| ` esp-C0:49:EF:CD:20:CCn: { "device-name" : "ESP32" , "id" : "C0:49:EF:CD:20:CC" }`  | Hub &rarr; MQTT broker &rarr; Dashboard | Once recived the discovery message the Hub responds with its details ( `id` is the MAC address and  ` device-name` is set by the manifacturer).|
| ` esp-C0:49:EF:CD:20:CC : { "mode" : "discovery" , "device" : "C0:49:EF:CD:20:CC" } ` | Dashboard &rarr; MQTT Broker &rarr; HUB | We set the topic to esp + hub.id and set it to discovery mode, so that the hub scans it's Wi-Fi network thourgh web sockets and returns the edge devices available.|
| `esp-C0:49:EF:CD:20:CC : { "device-name" : "MSP432" , "id" : "C0:49:EF:CD:20:CC-MSP432", "status" : "registered" } ` | Hub &rarr; MQTT broker &rarr; Dashboard | Returns that the device has been registered to the user.|

## Board setup by manifacturer

We give the manifacturer the ability to upload JSON files to let the user retrive data or send commands. The JSON stucture we came up with is preatty straightforward and is structured as it follows:

``` bash

{
  "set": {},
  "get": {
    "sensors": [
      {
        "type": "temperatures",
        "unit": "°C",
        "y-axys": {
          "min": 15,
          "max": 50
        }
      },
      {
        "type": "lux",
        "unit": "",
        "y-axys": {
          "min": 0,
          "max": 500
        }
      }
    ]
  }
}

```
As you can see above we have a the JSON for a device with a temperature sensor and a light one, the information contained is needed to create an adeguate data representation through charts.

``` bash

{
  "set": {
    "program_name": {
      "type": "string",
      "display_name": "Command",
      "description": "Write a command to be executed on the selected device"
    }
  },
  "get": {
    "sensors": [
      {
        "type": "CPU",
        "unit": "%",
        "y-axys": {
          "min": 0,
          "max": 100
        }
      }
    ]
  }
}

```
Here instead we can see one for a device that can also be controlled remotely.
These JSON are read by the ESP32 to retrive data from it's network edge devices, for more information on these take a look at the README of the [TinyCI-Hub repo](https://github.com/matteogastaldello/TinyCI-HUB).

# Problems during development

The most challenging part of the develpoment has surely been the set up of the AWS instance and make it reliable enough to make the project feasible, also implementing remote compiling has been really challenging given that is not something the average developer does. 

As far as more time consumimg tasks it was suerly planning, defining and implementing the data structure to use to better communicate with the Hub and the edge devices, but it was fundamental for the success of the project.

# Authors
Matteo Gastaldello

Federico Natali

Matteo Sabella

# Acknowledgments

<a href="https://www.unitn.it/">
  <img src="/assets/logo_unitn_it.png" width="300px">
</a>


