import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {AuthState} from '../../store/reducers/auth.reducer';
import * as fromAuthSelectors from '../../store/selectors/auth.selectors';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {IUserProfile} from '../../models/auth/user-profile.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-header-partial',
    templateUrl: './header-partial.component.html',
    styleUrls: ['./header-partial.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderPartialComponent implements OnInit, OnDestroy {
    isAutenticato = false;
    profile: IUserProfile;
    user$$: Subscription;
    showApplicationInfo: boolean;
    modalRef: BsModalRef;

    lang: string;

    constructor(
        private translate: TranslateService,
        private authService: AuthService,
        private userStore: Store<AuthState>,
        private cd: ChangeDetectorRef) {
        this.lang = this.translate.currentLang.split('-')[0];
    }

    ngOnInit(): void {

        this.user$$ = combineLatest([
            this.userStore.pipe(select(fromAuthSelectors.getIsLogged)),
            this.userStore.pipe(select(fromAuthSelectors.getProfile)),
        ]).subscribe(([logged, profile]) => {
            this.isAutenticato = logged;
            this.profile = profile;
            this.cd.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this.user$$.unsubscribe();
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }
}
