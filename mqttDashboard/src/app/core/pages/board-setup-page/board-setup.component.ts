import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { initSupabase } from "src/app/utils/initSupabase";
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from "src/app/utils/database.types";
import * as mqtt from 'mqtt/dist/mqtt.js';
import { Board } from "../../models/api/board.model";
import { Hub } from "../../models/api/hub.model";
import { exit } from "process";
import { hu } from "date-fns/locale";

const supabase = createClient<Database>(
  initSupabase.supabaseUrl,
  initSupabase.supabaseKey
)

let client: mqtt.MqttClient = mqtt.connect('mqtt://mqtt.matteogastaldello.it:8080')

@Component({
  selector: 'app-board-setup',
  templateUrl: './board-setup.component.html',
  styleUrls: ['./board-setup.component.scss'],
})
export class BoardSetupComponent implements OnInit, OnDestroy {
  myHubs: Hub[] = [];
  myBoards: Board[] = [];
  hubs: Hub[] = [];
  selectedHub: Hub;
  boards: Board[] = [];
  success = false;
  boardsLookup = false;
  block = false;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getMyHubs();
    client.on('connect', function () {
      console.log('connected');
    })
    client.subscribe('esp-firstConfiguration', function (err) {
      if (!err) {
        console.log('subscribed');
      }
    })
    this.mqttHandler();
  }

  ngOnDestroy(): void {
    client.end();
  }

  isRegistered(hub: Hub) {
    if (this.myHubs.find(x => x.id == hub.id)) {
      if(!this.block){
        client.publish('esp-firstConfiguration', JSON.stringify({ 'device-name': hub.device, 'id': hub.id, 'status': 'registered' }));
        this.block = true;
      }
      return true;
    } else {
      return false;
    }
  }

  boardIsMine(board: Board) {
    if (this.myBoards.find(x => x.id == board.id)) {
      return true;
    } else {
      return false;
    }
  }

  async getMyHubs() {
    const { data, error } = await supabase
      .from('Hubs')
      .select();
    this.myHubs = data;
    console.log(this.myHubs);
  }

  async getMyBoards() {
    const { data, error } = await supabase
      .from('boards')
      .select('*')
      .eq('hub', this.selectedHub.id);
    this.myBoards = data;
    console.log(this.myBoards);
  }

  async setDeviceDiscovery(hub: Hub) {
    client.unsubscribe('esp-firstConfiguration');
    client.subscribe('esp-' + hub.id, function (err) {
      if (!err) {
        console.log('subscribed');
      }
    })
    client.publish('esp-' + hub.id, JSON.stringify({ 'mode': 'discovery', 'device': hub.id }));
    this.selectedHub = hub;
    this.boardsLookup = true;
    this.getMyBoards();
  }

  async registerHub(hub: Hub) {
    const { data, error } = await supabase
      .from('Hubs')
      .insert([
        { id: hub.id, device: hub.device },
      ]);
    client.publish('esp-firstConfiguration', JSON.stringify({ 'device-name': hub.device, 'id': hub.id, 'status': 'registered' }));
    this.setDeviceDiscovery(hub);
  }


  async selectBoard(board: Board) {
    const { data, error } = await supabase
      .from('boards')
      .insert([
        { name: board.name, id: board.id , hub: board.hub},
      ]);
    this.success = true;
    client.publish('esp-'+this.selectedHub.id, JSON.stringify({ 'device-name': board.name, 'id': board.id, 'status': 'registered' }));
  }

  async testHubs() {
    client.publish('esp-firstConfiguration', JSON.stringify({ 'device-name': 'ESP32', 'id': '35:67:AC:C0' }));
  }

  async testBoards() {
    client.publish('esp-' + this.selectedHub.id, JSON.stringify({ 'device-name': 'MSP432', 'id': '35:67:AC:C0' }));
  }

  mqttHandler() {
    client.on('message', (topic, message, packet) => {
      var test = JSON.parse(message.toString());
      if (topic == 'esp-firstConfiguration') {
        if (this.hubs.find(x => x.id == test['id'])) {
          return;
        } else {
          this.hubs.push(new Hub(test['id'], test['device-name']));
        }
      } else {
        if(test['mode'] == 'discovery'){
          return;
        }
        if (test['status'] == 'registered') {
          return;
        }
        if (this.boards.find(x => x.id == test['id'])) {
          return;
        } else {
          this.boards.push(new Board(test['id'], test['device-name'], this.selectedHub.id));
        }
      }
    });
  }

}
