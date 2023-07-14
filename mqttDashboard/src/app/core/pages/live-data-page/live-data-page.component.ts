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
import { RealtimeChartOptions } from 'ngx-graph';
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
    names: string[] = [];
    loaded: boolean = false;
    stringer: string;
    board: BoardSensors = null;
    boards: Board[] = [];
    firmware: Firmware[] = [];
    index = 0;
    realtimeChartDataLux = [[...this.data.generateRandomRealtimeData(60, 10, 0, 3)]];
    realtimeChartDataTemp = [[...this.data.generateRandomRealtimeData(60, 10, 27, 3)]];

    constructor(private http: HttpClient, private data: DataService) { }

    ngOnInit() {
        client.on('connect', function () {
            console.log('connected');
        });
        this.getFields();
        interval(10000)
            .pipe(timeInterval())
            .subscribe(() => {
                this.realtimeChartDataTemp[0].push({ date: new Date(), value: this.data.randomInt(27, 70) });
            });
        interval(1000)
            .pipe(timeInterval())
            .subscribe(() => {
                this.realtimeChartDataLux[0].push({ date: new Date(), value: this.data.randomInt(0, 100) });
            });
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

    selectBoard(board: Board) {
        if(this.board != null){
            console.log('board is not null');
            this.board = null;
            this.sensors = [];
            this.fields = [];
            this.loaded = false;
        }
        this.board = new BoardSensors(board, []);
        find(this.firmware, (value) => {
            if (value.name == this.board.board.name) {
                const jsonObject = value.firmware;
                for (const key in jsonObject) {
                    if (jsonObject.hasOwnProperty(key)) {
                        const element = jsonObject[key];
                        this.fields.push({ [key]: element });
                    }
                }
            }
        });
        console.log(this.fields);
        for (const element of this.fields) {
            const getValue = element.get;
            if (!getValue) continue;

            const sensorsObj = getValue['sensors'];
            if (!sensorsObj) continue;

            for (const sensorObj of sensorsObj) {
                const sensor = new Sensor();
                for (const [key, value] of Object.entries(sensorObj)) {
                    if (key === 'type') {
                        console.log(value);
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
        console.log(this.sensors);
        this.board =new BoardSensors(board, this.sensors);
        console.log(this.board);
        this.loaded = true;
    }
}