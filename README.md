# Dashboard for Embedded Systems

# Description

Our Dashboard works as an interface for the user to interact with your Hubs and devices, and a way for our device manufacturer to set configuration files to add capabilities and/or sensors to their devices giving a better experinece to the end user.
All of this is powered by an Angular Single Page Application, written in typescript and an AWS IoT server running Mosquitto.

# Requirements

To run this software you'll need:
- A MQTT broker.
- An ESP32 running the [esp32-homebridge](https://github.com/matteogastaldello/esp32-HomeBridge).

For the edge-devices to be connected  you can reference the HomeBridge README.

You'll also need Angular CLI installed on your device to run the dashboard locally, otherwise you can deploy - with little to no modifications - this repo on [Vercel](vercel.com).

With this state of the art platform we implemented a refined UX for the end user, as well as the edge device manifacturer. Using our mosquitto instance, that's running on our AWS E2C IoT instance with Ubuntu 22.04, we're able to connect to our edge-devices, get data and send commands from everywhere in the world


# Project Layout

# External Software

## Using AWS E2C IoT



### Setting up AWS for mosquitto



## Supabase

# Usage

# How does it work?

# Problems during development

# Authors and Acknwoledgments

# License



## Tecnologies

Let's dive more into the technologies that we used: 

## MQTT Broker



## Dashboard

### Board setup

### Manage boards

### Live Data

### Board setup by manifacturer