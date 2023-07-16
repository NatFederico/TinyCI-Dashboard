import { Component, OnInit } from "@angular/core";
import { createClient } from "@supabase/supabase-js";
import { Database } from "src/app/utils/database.types";
import { initSupabase } from "src/app/utils/initSupabase";
import * as mqtt from 'mqtt/dist/mqtt.js';
import { HttpClient } from "@angular/common/http";
import { find, forEach } from "lodash";
import { Board } from "../../models/api/board.model";
import { Field } from "../../models/api/field.model";
import { Firmware } from "../../models/api/firmware.model";
import { interval } from 'rxjs';
import { timeInterval } from 'rxjs/operators';
import { DataService } from "../../services/data.service";
import { BoardSensors, Sensor } from "../../models/api/boardSensors.model";

const supabase = createClient<Database>(
    initSupabase.supabaseUrl,
    initSupabase.supabaseKey
)

let client: mqtt.MqttClient = mqtt.connect('mqtt://mqtt.matteogastaldello.it:8080')

@Component({
    selector: "app-live-data-page",
    templateUrl: "./live-data-page.component.html",
    styleUrls: ["./live-data-page.component.scss"]
})

export class LiveDataPageComponent implements OnInit {
    fields: Field[] = [];
    val: number[] = [];
    sensors: Sensor[] = [];
    loaded: boolean = false;
    loading: boolean = false;
    stringer: string;
    boardFocus: BoardSensors;
    boards: Board[] = [];
    firmware: Firmware[] = [];
    DataError: boolean = false;
    flag: boolean = false;

    constructor(private http: HttpClient, private data: DataService) { }

    ngOnInit() {
        client.on('connect', function () {
            console.log('connected');
        });
        this.getFields();
        this.mqttHandler();
    }

    ngOnDestroy(): void {
        client.end();
    }

    async getFields() {
        const { data: test, error } = await supabase
            .from('boards')
            .select();
        this.boards = test;
        const { data: firmware } = await supabase
            .from('producer')
            .select();
        this.firmware = firmware;
    }

    averageData(sensor: Sensor) {
        let sum = 0;
        let index = 0;
        sensor.realtimeChartData.forEach(element => {
            forEach(element, (value) => {
                index++;
                sum += value.value;
            });
        });
        return (sum / index).toPrecision(4);
    }

    boardIsfocused(board: Board) {
        if (this.boardFocus == null) {
            return false;
        }
        if (this.boardFocus.board.id == board.id) {
            return true;
        }
        return false;
    }

    unwatch() {
        client.unsubscribe('esp-' + this.boardFocus.board.hub, function (err) {
            if (!err) {
                console.log('unsubscribed');
            }
        });
        this.DataError = false;
        this.boardFocus = null;
        this.sensors = [];
        this.fields = [];
        this.loaded = false;
        this.flag = false;
    }

    selectBoard(board: Board) {
        this.flag = true;
        client.subscribe('esp-' + board.hub, function (err) {
            if (!err) {
                console.log('subscribed');
            }
        })
        this.loading = true;
        client.publish('esp-' + board.hub, JSON.stringify({ 'mode': 'get', 'device': board.name, 'stream': true }));
        //client.publish('esp-' + board.hub, JSON.stringify({ 'mode': 'get', 'device': 'null', 'stream': true }));
        this.mqttHandler();
        if (this.boardFocus != null) {
            this.boardFocus = null;
            this.sensors = [];
            this.fields = [];
            this.loaded = false;
            this.loading = false;
        }
        this.boardFocus = new BoardSensors(board, []);
        find(this.firmware, (value) => {
            if (value.name == this.boardFocus.board.name) {
                const jsonObject = value.firmware;
                for (const key in jsonObject) {
                    if (jsonObject.hasOwnProperty(key)) {
                        const element = jsonObject[key];
                        this.fields.push({ [key]: element });
                    }
                }
            }
        });
        for (const element of this.fields) {
            const getValue = element.get;
            if (!getValue) continue;

            const sensorsObj = getValue['sensors'];
            if (!sensorsObj) continue;

            for (const sensorObj of sensorsObj) {
                const sensor = new Sensor(new DataService());
                for (const [key, value] of Object.entries(sensorObj)) {
                    if (key === 'type') {
                        sensor.type = value.toString();
                    } else if (key === 'unit') {
                        sensor.unit = value.toString();
                    } else {
                        sensor.options.max = value['max'].toString();
                        sensor.options.min = value['min'].toString();
                    }
                }
                this.sensors.push(sensor);
            }
        }
        forEach(this.sensors, (value) => {
            value.generateOption();
        });
        this.boardFocus = new BoardSensors(board, this.sensors);
    }

    mqttHandler() {
        client.on('message', (topic, message, packet) => {
            let messageTest: JSON = JSON.parse(message.toString());
            if (topic == 'esp-' + this.boardFocus.board.hub) {
                if (messageTest['success'] == false) {
                    this.DataError = true;
                    return;
                }
                if (messageTest['sensors']) {
                    this.DataError = false;
                    var jsonSens = messageTest['sensors'];
                    forEach(this.boardFocus.sensors, (value) => {
                        if (jsonSens[value.type]) {
                            let sum = 0;
                            if (jsonSens[value.type].length > 1) {
                                forEach(jsonSens[value.type], (value2) => {
                                    sum += +value2;
                                });
                                let avg = sum / jsonSens[value.type].length;
                                value.realtimeChartData[0].push({ date: new Date(), value: avg });
                            } else {
                                sum = parseFloat(jsonSens[value.type])*100;
                                value.realtimeChartData[0].push({ date: new Date(), value: sum });
                            }
                        }
                    });
                    this.loaded = true;
                }
            }
        });
    }
}