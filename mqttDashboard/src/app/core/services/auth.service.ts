import {Injectable} from '@angular/core';
import * as Oidc from 'oidc-client';
import {User, UserManager} from 'oidc-client';
import {environment} from 'src/environments/environment';
import {AuthState} from '../store/reducers/auth.reducer';
import {Store} from '@ngrx/store';
import * as fromAuthActions from '../store/actions/auth.actions';
import {LoggerService} from './logger.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthService {
    mgr: UserManager;

    constructor(private authStore: Store<AuthState>, private translate: TranslateService, private router: Router, private logger: LoggerService) {
    }

    init() {
        Oidc.Log.logger = this.logger;

        if (environment.production) {
            Oidc.Log.level = Oidc.Log.ERROR;
        }

        const isLocal = environment.auth.redirectUri.indexOf('localhost') >= 0;

        this.mgr = new UserManager({
            client_id: environment.auth.clientId,
            authority: environment.auth.authority,
            metadataUrl: environment.auth.discoveryEndpoint,
            ui_locales: this.translate.currentLang,
            redirect_uri: environment.auth.redirectUri,
            silent_redirect_uri: environment.auth.silentRedirectUri,
            post_logout_redirect_uri: environment.auth.postLogoutRedirectUri,
            response_type: environment.auth.responseType,
            scope: environment.auth.scope,
            automaticSilentRenew: !isLocal,
            checkSessionInterval: 5000,
            monitorSession: !isLocal,
            filterProtocolClaims: true,
            loadUserInfo: true
        });

        this.mgr.getUser().then((user: User) => {
            // sessione utente ripristinata da localstorage
            if (user && !user.expired) {
                // utente esiste
                this.authStore.dispatch(fromAuthActions.loadFromStorageSuccess({user}));
            } else {
                // utente non esiste o sessione scaduta
                this.authStore.dispatch(fromAuthActions.loadFromStorageFail());
            }
        }).catch((err) => {
            this.authStore.dispatch(fromAuthActions.loadFromStorageFail());
        });

        this.mgr.events.addUserLoaded((user) => {
            this.authStore.dispatch(fromAuthActions.refreshSuccess({user}));
        });

        this.mgr.events.addSilentRenewError(e => {
            this.authStore.dispatch(fromAuthActions.refreshFail());
        });

        this.mgr.events.addAccessTokenExpired(e => {
            this.authStore.dispatch(fromAuthActions.sessionExpired());
        });

    }

    login() {
        this.logger.debug('Avvio login...');
        this.clear();
        this.mgr.signinRedirect().catch((reason) => {
            this.logger.error('signinRedirect error: {0}', reason);
        });
    }

    completeLoginCallback() {
        this.mgr.signinRedirectCallback().then((user) => {
            this.authStore.dispatch(fromAuthActions.loginSuccess({user}));

        }).catch((err) => {
            this.authStore.dispatch(fromAuthActions.loginFail());
        });
    }

    completeSilentCallback() {
        this.mgr.signinSilentCallback();
    }

    completeLogoutCallback() {
        this.mgr.signoutRedirectCallback().then((user) => {
            this.authStore.dispatch(fromAuthActions.logoutSuccess());

        }).catch((err) => {
            this.authStore.dispatch(fromAuthActions.loginFail());
        });
    }

    clear() {
        this.mgr.clearStaleState();
    }

    logout() {
        this.logger.debug('Avvio logout...');
        this.mgr.revokeAccessToken();
        this.mgr.signoutRedirect();
    }
}

