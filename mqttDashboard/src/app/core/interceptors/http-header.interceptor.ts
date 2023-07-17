import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from 'src/environments/environment';
import {select, Store} from '@ngrx/store';
import {AuthState} from '../store/reducers/auth.reducer';
import * as fromAuthSelectors from '../store/selectors/auth.selectors';
import {User} from 'oidc-client';
import {filter} from 'rxjs/operators';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
    user: User;

    constructor(
        private translate: TranslateService,
        private authState: Store<AuthState>
    ) {
        this.authState.pipe(select(fromAuthSelectors.getUser), filter((user) => user != null)).subscribe((x) => {
            this.user = x;
        });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.indexOf('./assets/') === -1) {
            let headers = request.headers;
            headers = headers.set('unitn-culture', this.translate.currentLang);
            if (!headers.has('unitn-referenceid')) {
                headers = headers.set('unitn-referenceid', sessionStorage.getItem(environment.storage.keys.referenceId));
            }
            if (!headers.has('api-version')) {
                headers = headers.set('api-version', environment.apiVersion);
            }
            // Aggiunge in automatico l'access token a tutte le chiamate al server di API UniTrento
            if (!headers.has('Authorization') && request.url.indexOf(environment.apiUrlPrefix) >= 0 && this.user != null && this.user.access_token != null) {
                headers = headers.set('Authorization', 'Bearer ' + this.user.access_token);
            }
            const reqCloned = request.clone({headers});
            return next.handle(reqCloned);
        } else {
            return next.handle(request);
        }
    }
}
