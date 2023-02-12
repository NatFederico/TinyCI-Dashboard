import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss']
})
export class UserHomePageComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {

  }


  toastIt(tipo: string) {
    switch (tipo) {
      case 'info':
        this.toastr.info('Prova messaggio...', 'Info');
        break;
      case 'success':
        this.toastr.success('Prova messaggio...', 'Success');
        break;
      case 'warning':
        this.toastr.warning('Prova messaggio...', 'Warning');
        break;
      case 'error':
        this.toastr.error('Prova messaggio...', 'Error');
        break;
    }

  }
}
