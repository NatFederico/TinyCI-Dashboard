import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {filter, skipWhile} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {AuthService} from './core/services/auth.service';
import {LoggerService} from './core/services/logger.service';
import {AuthState} from './core/store/reducers/auth.reducer';
import * as fromAuthSelectors from './core/store/selectors/auth.selectors';
import {last} from 'lodash';
import {AuthActionTypes} from './core/store/actions/auth.actions';
import {v4 as uuid} from 'uuid';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    lingua = '';
    user$$: Subscription;
    currentUrl: string;

    constructor(
        private translate: TranslateService,
        private authService: AuthService,
        private authStore: Store<AuthState>,
        private router: Router,
        private toastr: ToastrService,
        private logger: LoggerService
    ) {
        this.lingua = localStorage.getItem(environment.storage.keys.culture);
        this.translate.use(this.lingua);
        moment.locale(this.lingua);
    }

    ngOnDestroy(): void {
        this.user$$.unsubscribe();
    }

    ngOnInit(): void {
        this.router.events.pipe(
            filter((event => event && event instanceof NavigationStart))
        ).subscribe((event: NavigationStart) => {
            this.currentUrl = event.url;
        });

        this.user$$ = this.authStore.pipe(
            select(fromAuthSelectors.getHistory),
            skipWhile((history) => history.length === 0),
        ).subscribe((history) => {
            const event: string = last(history);
            this.logger.debug('Auth history event...', event);
            switch (event) {
                case AuthActionTypes.SIGN_IN_SUCCESS:
                    if (this.currentUrl && this.currentUrl.indexOf('/oauth/callback') >= 0) {
                        const routeAfterLogin = localStorage.getItem(environment.storage.keys.routeAfterLogin) ?? '/user';
                        this.logger.debug('Login callback...', routeAfterLogin);
                        this.router.navigateByUrl(routeAfterLogin).then(() => {
                            localStorage.removeItem(environment.storage.keys.routeAfterLogin);
                        });
                    }
                    break;
                case AuthActionTypes.LOAD_FROM_STORAGE_SUCCESS:
                    break;
                case AuthActionTypes.REFRESH_SUCCESS:
                    break;
                case AuthActionTypes.SIGN_IN_FAILED:
                case AuthActionTypes.SIGN_OUT_SUCCESS:
                case AuthActionTypes.SIGN_OUT_FAILED:
                    this.router.navigateByUrl('/welcome');
                    break;
                case AuthActionTypes.REFRESH_FAILED:
                    break;
                case AuthActionTypes.SESSION_EXPIRED:
                    this.toastr.warning(this.translate.instant('APP_TS.SESSIONE_TERMINATA_TITLE'), this.translate.instant('APP_TS.SESSIONE_TERMINATA_MESSAGE'));
                    this.authService.logout();
                    break;
            }
            if (event != AuthActionTypes.REFRESH_SUCCESS) {
                sessionStorage.setItem(environment.storage.keys.referenceId, uuid());
            }
        });
    }
}
