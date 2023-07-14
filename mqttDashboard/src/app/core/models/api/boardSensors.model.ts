import { Board } from "./board.model";
import { RealtimeChartOptions } from 'ngx-graph';
import { Firmware } from "./firmware.model";
import { Field } from "./field.model";

export class BoardSensors {
    board: Board;
    sensors: Sensor[];
    option: RealtimeChartOptions[] = [{
        height: 250,
        margin: { left: 40 },
        lines: [
            { color: '#34B77C', lineWidth: 3, area: true, areaColor: '#34B77C', areaOpacity: .2 }
        ],
        xGrid: { tickPadding: 15, tickNumber: 5 },
        yGrid: { min: 0, max: 70, tickNumber: 5, tickFormat: (v: number) => `${v}°C`, tickPadding: 25 }
    }];

    constructor(board: Board, sensors: Sensor[]) {
        this.board = board;
        this.sensors = sensors;
    }
}

export class Sensor {
    type: string = '';
    unit: string = '';
    options: {
        max: number,
        min: number
    }
    realtimeOption: RealtimeChartOptions;

    constructor() {
        this.type = '';
        this.unit = '';
        this.options = {
            max: 0,
            min: 0
        }
    }

    generateOption() {
        this.realtimeOption = {
            height: 250,
            margin: { left: 40 },
            lines: [
                { color: '#34B77C', lineWidth: 3, area: true, areaColor: '#34B77C', areaOpacity: .2 }
            ],
            xGrid: { tickPadding: 15, tickNumber: 5 },
            yGrid: { min: this.options.min, max: this.options.max, tickNumber: 5, tickFormat: (v: number) => `${v}` + this.unit, tickPadding: 25 }
        }
    }
}