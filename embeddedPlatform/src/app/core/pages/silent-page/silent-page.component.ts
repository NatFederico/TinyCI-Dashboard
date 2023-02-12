import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'app-silent-page',
  templateUrl: './silent-page.component.html',
  styleUrls: ['./silent-page.component.scss']
})
export class SilentPageComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private logger: LoggerService
  ) { }

  ngOnInit(): void {
    this.logger.debug('Auth silent refresh');
    this.auth.completeSilentCallback();
  }

}
