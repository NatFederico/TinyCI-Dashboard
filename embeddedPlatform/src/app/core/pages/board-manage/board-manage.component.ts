import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { initSupabase } from "src/app/utils/initSupabase";
import { MQTT, IClientOptions } from 'mqtt/dist/mqtt';
import { ApiService } from '../../services/api.service';
import { createClient, SupabaseClient } from '@supabase/supabase-js'

@Component({
    selector: 'app-board-manage',
    templateUrl: './board-manage.component.html',
    styleUrls: ['./board-manage.component.scss']
})
export class BoardManageComponent implements OnInit {
    fields = [];
    boards: {
        id: string;
        name: string;
        template: JSON;
    }[]
    supabase: SupabaseClient = createClient(initSupabase.supabaseUrl, initSupabase.supabaseKey);
    // client;


    constructor(private http: HttpClient, private api: ApiService) { }

    ngOnInit() {
        this.getFields();
        // this.connectToMQTT();
    }



    async getFields() {
        const { data, error } = await this.supabase
            .from('boards')
            .select();
        this.boards = data;
        console.log(this.boards[0].template);
        const jsonObject = this.boards[0].template;
        for(const key in jsonObject){
            if(jsonObject.hasOwnProperty(key)){
                this.fields.push({name: key, label: key, value: jsonObject[key]});
            }
        }
    }

    // connectToMQTT() {
    //     const options: IClientOptions = {
    //         host: '{your_mqtt_broker_host}',
    //         port: '{your_mqtt_broker_port}',
    //         username: '{your_mqtt_broker_username}',
    //         password: '{your_mqtt_broker_password}',
    //         clientId: '{your_mqtt_client_id}'
    //     };

    //     this.client = new MQTT.Client(options);
    //     this.client.connect();
    // }

    submitForm() {
        const payload = JSON.stringify(this.fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {}));

        // this.client.publish('{your_mqtt_topic}', payload);
    }
}