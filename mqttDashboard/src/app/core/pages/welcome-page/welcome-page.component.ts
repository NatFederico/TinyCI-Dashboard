import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { AuthState } from '../../store/reducers/auth.reducer';
import * as fromAuthSelectors from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router
  ) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
  }
}
