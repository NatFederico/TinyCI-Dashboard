import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-callback-page',
  templateUrl: './callback-page.component.html',
  styleUrls: ['./callback-page.component.scss']
})
export class CallbackPageComponent implements OnInit {
  
  constructor(
    private auth: AuthService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.logger.debug('Auth silent refresh');
    this.auth.completeLoginCallback();
  }

}

