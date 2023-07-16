import { Component, OnInit } from "@angular/core";
import * as mqtt from 'mqtt/dist/mqtt.js';
import { interval } from "rxjs";


let client: mqtt.MqttClient = mqtt.connect('mqtt://mqtt.matteogastaldello.it:8080')

@Component({
    selector: "app-remote-testing",
    templateUrl: "./remote-testing.component.html",
    styleUrls: ["./remote-testing.component.scss"]
})
export class RemoteTestingComponent implements OnInit {

    mqttFeed: string = '';

    ngOnInit() {
        client.on('connect', function () {
            console.log('connected');
        });
        client.subscribe('esp-C0:49:EF:CD:20:CC', function (err) {
            if (!err) {
                console.log('subscribed');
            }
        });
        client.subscribe('esp-firstConfiguration', function (err) {
            if (!err) {
                console.log('subscribed');
            }
        });
        client.on('message', (topic, message, packet) => {
            this.mqttFeed += topic + " : " + message.toString() + " - " + Date() + "\n";
        });
    }


    async testHubs() {
        client.publish('esp-firstConfiguration', JSON.stringify({ 'device-name': 'ESP32', 'id': 'C0:49:EF:CD:20:CC' }));
    }

    async testBoards() {
        client.publish('esp-C0:49:EF:CD:20:CC', JSON.stringify({ 'device-name': 'MSP432', 'id': 'C0:49:EF:CD:20:CC-MSP432' }));
    }

    async testSensors() {
        let temps;
        let lux;
        let i = 0;
        const interval = setInterval((): void => {
            temps = [];
            lux = [];
            for(let i=0; i<6; i++){
                temps.push(Math.floor(Math.random() * (50 - 15 + 1)) + 15);
                lux.push(Math.floor(Math.random() * 500));
            }
            client.publish('esp-C0:49:EF:CD:20:CC', JSON.stringify({ 'sensors': { 'temperatures': temps } }));
            client.publish('esp-C0:49:EF:CD:20:CC', JSON.stringify({ 'sensors': { 'lux': lux } }));
            if (++i === 300) {
                clearInterval(interval);
            }
        }, 2500);
    }

    async forceDiscoveryMode() {
        client.publish('esp-C0:49:EF:CD:20:CC', JSON.stringify({ 'mode': 'discovery', 'device': 'esp-C0:49:EF:CD:20:CC' }));
    }
}