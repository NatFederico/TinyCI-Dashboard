import {HttpClient} from "@angular/common/http";
import {Component, OnDestroy, OnInit} from "@angular/core";
import {initSupabase} from "src/app/utils/initSupabase";
import {createClient} from '@supabase/supabase-js'
import {Database} from "src/app/utils/database.types";
import * as mqtt from 'mqtt/dist/mqtt.js';
import {FieldDescription} from "../../models/api/field.model";
import {find, forEach} from "lodash";
import {Board} from "../../models/api/board.model";
import {Firmware} from "../../models/api/firmware.model";

const supabase = createClient<Database>(
    initSupabase.supabaseUrl,
    initSupabase.supabaseKey
)

let client: mqtt.MqttClient = mqtt.connect('mqtt://mqtt.matteogastaldello.it:8080')

@Component({
    selector: 'app-board-manage',
    templateUrl: './board-manage.component.html',
    styleUrls: ['./board-manage.component.scss']
})

export class BoardManageComponent implements OnInit, OnDestroy {
    fields: FieldDescription[] = [];
    val: string[] = [];
    names: string[] = [];
    desc: string[] = [];
    loaded: boolean = false;
    sent: boolean = false;
    stringer: string;
    focusBoard: Board;
    boards: Board[] = null;
    firmware: Firmware[] = [];
    index = 0;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        client.on('connect', function () {
            console.log('connected');
        })
        this.getFields();
    }

    ngOnDestroy(): void {
        client.end();
    }

    exitSetup() {
        this.loaded = false;
        this.focusBoard = null;
        this.fields = [];
        this.val = [];
        this.names = [];
    }

    async getFields() {
        const {data: test, error} = await supabase
            .from('boards')
            .select();
        this.boards = test;
        const {data: firmware} = await supabase
            .from('producer')
            .select();
        this.firmware = firmware;
    }

    selectBoard(board: Board) {
        this.fields = [];
        this.focusBoard = board;
        find(this.firmware, (value) => {
            if (value.name == this.focusBoard.name) {
                const jsonObject = value.firmware['set'];
                for (const key in jsonObject) {
                    if (jsonObject.hasOwnProperty(key)) {
                        const element = jsonObject[key];
                        this.fields.push(new FieldDescription(key, element['type'], element['display_name'], element['description']));
                    }
                }
            }
        });
        this.Infos();
        this.loaded = true;
    }

    Infos() {
        this.names = [];
        this.desc = [];
        forEach(this.fields, (value) => {
            this.names.push(value.display_name);
            this.desc.push(value.description);
        });

    }

    indexOf(name: string) {
        return this.names.indexOf(name);
    }

    send() {
        client.publish('esp-' + this.focusBoard.hub, JSON.stringify({
            'device': this.focusBoard.name,
            'mode': 'set',
            'program': this.val[0]
        }));
        this.sent = true;
    }

    refresh() {
        window.location.reload();
    }
}
