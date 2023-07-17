import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable, of} from 'rxjs';
import {skipWhile, switchMap} from 'rxjs/operators';
import {AuthState} from '../store/reducers/auth.reducer';
import * as fromAuthSelectors from '../store/selectors/auth.selectors';
import {intersection} from 'lodash';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {environment} from 'src/environments/environment';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {
    constructor(
        private authStore: Store<AuthState>,
        private router: Router,
        private auth: AuthService,
        private toastr: ToastrService,
        private translate: TranslateService
    ) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return combineLatest([
            this.authStore.pipe(select(fromAuthSelectors.getHistory)),
            this.authStore.pipe(select(fromAuthSelectors.getIsLogged)),
            this.authStore.pipe(select(fromAuthSelectors.getRoles))
        ]).pipe(
            skipWhile(([history, logged, roles]) => history.length === 0),
            switchMap(([history, logged, roles]) => {
                let authorized = logged;
                if (authorized) {
                    if (roles.length >= 0 && environment.authorization.userRoles && environment.authorization.userRoles.length > 0) {
                        authorized = intersection(roles, environment.authorization.userRoles).length !== 0;
                    }
                    if (authorized && roles.length >= 0 && route.data && route.data.roles && route.data.roles.length > 0) {
                        authorized = intersection(roles, route.data.roles).length !== 0;
                    }
                }
                if (!logged) {
                    sessionStorage.setItem(environment.storage.keys.routeAfterLogin, state.url);
                    this.auth.login();
                } else if (!authorized) {
                    this.toastr.error(this.translate.instant('GUARD.CORE.USER.NO_AUTHORIZATION_MESSAGE'), this.translate.instant('GUARD.CORE.USER.NO_AUTHORIZATION_TITLE'))
                    this.router.navigateByUrl('/');
                }
                return of(authorized);
            })
        );
    }
}
