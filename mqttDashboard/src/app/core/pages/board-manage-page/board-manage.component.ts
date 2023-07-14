import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { initSupabase } from "src/app/utils/initSupabase";
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from "src/app/utils/database.types";
import * as mqtt from 'mqtt/dist/mqtt.js';
import { Field } from "../../models/api/field.model";
import { find, forEach } from "lodash";
import { fi, te } from "date-fns/locale";
import { Board } from "../../models/api/board.model";
import { Firmware } from "../../models/api/firmware.model";

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
    fields: Field[] = [];
    val: number[] = [];
    names: string[] = [];
    loaded: boolean = false;
    stringer: string;
    board: Board;
    boards: Board[] = [];
    firmware: Firmware[] = [];
    index = 0;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        client.on('connect', function () {
            console.log('connected');
        })
        this.getFields();
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
        this.fields = [];
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
        this.Names();
        this.loaded = true;
    }

    Names(){
        this.names = [];
        forEach(this.fields, (value) => {
            this.names.push(Object.keys(value)[0]);
        });
    }

    indexOf(name: string) {
        return this.names.indexOf(name);
    }

    send() {
       this.stringer = '';
       this.stringer += '{';
        forEach(this.names, (value) => {
            if(this.names.indexOf(value) == this.names.length-1){
                this.stringer += '"' + value + '":' + this.val[this.indexOf(value)];
            } else {
                this.stringer += '"' + value + '":' + this.val[this.indexOf(value)] + ',';
            }
        });
        this.stringer += '}';
        client.subscribe('board_set', function (err) {
            if (!err) {
                console.log('subscribed');
            }
        });
        client.publish('esp-'+this.board.id,this.stringer);
        console.log('esp-'+this.board.id, JSON.parse(this.stringer));
    }

    test() {
        this.stringer = '{';
         forEach(this.names, (value) => {
            console.log(this.names.indexOf(value));
            if(this.names.indexOf(value) == this.names.length-1){
                this.stringer += '"' + value + '":' + this.val[this.indexOf(value)];
            } else {
                this.stringer += '"' + value + '":' + this.val[this.indexOf(value)] + ',';
            }
         });
         this.stringer = this.stringer.slice(0, -1);
         this.stringer += '}';
         client.subscribe('board_set', function (err) {
             if (!err) {
                 console.log('subscribed');
             }
         });
         client.publish('esp-firstConfiguration', '{ \"device-name\": \"ESP\", \"id\": \"mac-address\"}');
     }
}