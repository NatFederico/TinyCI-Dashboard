import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { initSupabase } from "src/app/utils/initSupabase";
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from "src/app/utils/database.types";
import * as mqtt from 'mqtt/dist/mqtt.js';
import { Board } from "../../models/api/board.model";

const supabase = createClient<Database>(
  initSupabase.supabaseUrl,
  initSupabase.supabaseKey
)

let client: mqtt.MqttClient = mqtt.connect('mqtt://mqtt.matteogastaldello.it:8080')

@Component({
  selector: 'app-board-setup',
  templateUrl: './board-setup.component.html',
  styleUrls: ['./board-setup.component.scss']
})
export class BoardSetupComponent implements OnInit, OnDestroy {
  boards : Board[] = [];
  success = false;;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    client.on('connect', function () {
      console.log('connected');
    })
    client.subscribe('esp-firstConfiguration', function (err) {
      if (!err) {
        console.log('subscribed');
      }
    })
    client.on('message', (topic, message, packet) => {
      var test = JSON.parse(message.toString());
      console.log(test['id']);
      if (this.boards.find(x => x.id == test['id'])) {
        return;
      } else {
      this.boards.push(new Board(test['id'], test['device-name']));
      }
      console.log(this.boards);
    });
  }

  ngOnDestroy(): void {
    client.end();
  }

  async submitForm(board: Board) {
    const { data, error } = await supabase
      .from('boards')
      .insert([
        { name: board.name, id: board.id },
      ]);
    this.success = true;
    client.publish('esp-firstConfiguration', JSON.stringify({ 'device-name': board.name, 'id': board.id, 'status': 'registered' }));
  }

}
