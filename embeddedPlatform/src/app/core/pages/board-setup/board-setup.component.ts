import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { initSupabase } from 'src/app/utils/initSupabase';

@Component({
  selector: 'app-board-setup',
  templateUrl: './board-setup.component.html',
  styleUrls: ['./board-setup.component.scss']
})
export class BoardSetupComponent {
  board = {
    name: '',
    jsonData: ''
  };
  supabase: SupabaseClient = createClient(initSupabase.supabaseUrl, initSupabase.supabaseKey);
  success = false;

  constructor(private http: HttpClient) { }

  async submitForm() {
    const { data, error } = await this.supabase
      .from('boards')
      .insert([
        { name: this.board.name, template: this.board.jsonData },
      ]);
      this.success = true;
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      this.board.jsonData = JSON.parse(reader.result as string);
    };
  }

}
