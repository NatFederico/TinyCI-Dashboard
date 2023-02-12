import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  submitForm() {
    const url = initSupabase.supabaseUrl+'/rest/boards';
    this.http.post(url, this.board.jsonData)
      .subscribe(response => {
        console.log(response);
      });
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
