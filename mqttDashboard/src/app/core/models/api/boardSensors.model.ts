import { Board } from "./board.model";
import { RealtimeChartOptions } from 'ngx-graph';
import { DataService } from "../../services/data.service";


export class BoardSensors {
    board: Board;
    sensors: Sensor[];
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
    realtimeChartData: { date: Date; value: number }[][];

    constructor(private data: DataService) {
        this.type = '';
        this.unit = '';
        this.options = {
            max: 0,
            min: 0
        };
    }

    generateOption() {
        this.realtimeOption = {
            height: 250,
            margin: { left: 40 },
            lines: [
                { color: '#34B77C', lineWidth: 3, area: true, areaColor: '#34B77C', areaOpacity: .2 }
            ],
            xGrid: { tickPadding: 15, tickNumber: 5 },
            yGrid: { min: +this.options.min, max: +this.options.max, tickNumber: 5, tickFormat: (v: number) => `${v}` + this.unit, tickPadding: 25 }
        }
        if (this.type == 'temperatures') {
            this.realtimeChartData = [[...this.data.generateRandomRealtimeData(0, 15, +this.options.min, +this.options.max)]];
        }
        else {
            this.realtimeChartData = [[...this.data.generateRandomRealtimeData(0, 5, +this.options.min, +this.options.max)]];
        }
    }
}