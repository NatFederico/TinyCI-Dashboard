import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { initSupabase } from "src/app/utils/initSupabase";
import { MQTT, IClientOptions } from 'mqtt/dist/mqtt';

@Component({
    selector: 'app-board-manage',
    templateUrl: './board-manage.component.html',
    styleUrls: ['./board-manage.component.scss']
})
export class BoardManageComponent implements OnInit {
    fields = [];
    client;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.getFields();
        this.connectToMQTT();
    }

    getFields() {
        const url = initSupabase.supabaseUrl;
        this.http.get(url)
            .subscribe(response => {
                const keys = Object.keys(response[0]);
                this.fields = keys.map(key => ({ name: key, type: 'text', value: response[0][key] }));
            });
    }

    connectToMQTT() {
        const options: IClientOptions = {
            host: '{your_mqtt_broker_host}',
            port: '{your_mqtt_broker_port}',
            username: '{your_mqtt_broker_username}',
            password: '{your_mqtt_broker_password}',
            clientId: '{your_mqtt_client_id}'
        };

        this.client = new MQTT.Client(options);
        this.client.connect();
    }

    submitForm() {
        const payload = JSON.stringify(this.fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
        }, {}));

        this.client.publish('{your_mqtt_topic}', payload);
    }
}