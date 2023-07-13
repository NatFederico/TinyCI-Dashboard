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
    names: string[] = [];
    loaded: boolean = false;
    stringer: string;
    board: Board;
    boards: Board[] = [];
    firmware: Firmware[] = [];
    index = 0;
    realtimeChartDataLux = [[...this.data.generateRandomRealtimeData(60, 1, 0, 100)]];
    realtimeChartDataTemp = [[...this.data.generateRandomRealtimeData(60, 10, 27, 50)]];

    realtimeChartOptionsLux: RealtimeChartOptions = {
        height: 250,
        margin: { left: 40 },
        lines: [
            { color: '#34B77C', lineWidth: 3, area: true, areaColor: '#34B77C', areaOpacity: .2 }
        ],
        xGrid: { tickPadding: 15, tickNumber: 5 },
        yGrid: { min: 0, max: 100, tickNumber: 5, tickFormat: (v: number) => `${v}%`, tickPadding: 25 }
    };

    realtimeChartOptionsTemp: RealtimeChartOptions = {
        height: 250,
        margin: { left: 40 },
        lines: [
            { color: '#34B77C', lineWidth: 3, area: true, areaColor: '#34B77C', areaOpacity: .2 }
        ],
        xGrid: { tickPadding: 15, tickNumber: 5 },
        yGrid: { min: 0, max: 70, tickNumber: 5, tickFormat: (v: number) => `${v}°C`, tickPadding: 25 }
    };

    constructor(private http: HttpClient, private data: DataService) { }

    ngOnInit() {
        client.on('connect', function () {
            console.log('connected');
        })
        this.getFields();
        interval(10000)
            .pipe(timeInterval())
            .subscribe(() => {
                this.realtimeChartDataTemp[0].push({ date: new Date(), value: this.data.randomInt(27, 70) });
                this.realtimeChartDataLux[0].push({ date: new Date(), value: this.data.randomInt(0, 100) });
            })
    }

    ngOnDestroy(): void {
        client.end();
    }

    async getFields() {
        const { data: test, error } = await supabase
            .from('boards')
            .select();
        this.boards = test;
        console.log(this.boards);
        const { data: firmware } = await supabase
            .from('producer')
            .select();
        this.firmware = firmware;
    }

    selectBoard(board: Board) {
        if(this.board == board){
            this.board = null;
            this.fields = [];
            this.loaded = false;
            return;
        }
        this.board = board;
        find(this.firmware, (value) => {
            if (value.name == this.board.name) {
                const jsonObject = value.firmware;
                for (const key in jsonObject) {
                    if (jsonObject.hasOwnProperty(key)) {
                        const element = jsonObject[key];
                        this.fields.push({ [key]: element });
                    }
                }
            }
        });
        this.loaded = true;
    }
}