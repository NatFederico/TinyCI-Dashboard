import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { initSupabase } from "src/app/utils/initSupabase";

@Component({
    selector: 'app-board-manage',
    templateUrl: './board-manage.component.html',
    styleUrls: ['./board-manage.component.scss']
})
export class BoardManageComponent implements OnInit {
    fields = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getFields();
    }

    getFields() {
        const url = initSupabase.supabaseUrl;
        this.http.get(url)
          .subscribe(response => {
            const keys = Object.keys(response[0]);
            this.fields = keys.map(key => ({ name: key, type: 'text', value: response[0][key] }));
          });
      }

      submitForm() {
        console.log(this.fields);
      }
}