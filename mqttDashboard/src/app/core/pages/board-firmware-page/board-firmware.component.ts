import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { initSupabase } from "src/app/utils/initSupabase";
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from "src/app/utils/database.types";
import * as mqtt from 'mqtt/dist/mqtt.js';
import { Field } from "../../models/api/field.model";
import { forEach } from "lodash";
import { te } from "date-fns/locale";
import { Board } from "../../models/api/board.model";
import { Firmware } from "../../models/api/firmware.model";

const supabase = createClient<Database>(
  initSupabase.supabaseUrl,
  initSupabase.supabaseKey
)

@Component({
    selector: 'app-board-firmware',
    templateUrl: './board-firmware.component.html',
    styleUrls: ['./board-firmware.component.scss']
})
export class BoardFirmwareComponent {
    firmwareText = "";
    name: string;
    success = false;

    async submitForm() {
      const { data, error } = await supabase
      .from('producer')
      .insert([
        { name: this.name, firmware: JSON.parse(this.firmwareText) },
      ]);
      this.success = true;
      }
    
      uploadFile(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          this.firmwareText = reader.result as string;
        };
      }
}