import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-end-session-page',
  templateUrl: './end-session-page.component.html',
  styleUrls: ['./end-session-page.component.scss']
})
export class EndSessionPageComponent implements OnInit {
  
  constructor(
    private auth: AuthService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.auth.completeLogoutCallback();
  }

}

