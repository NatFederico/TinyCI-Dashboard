import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-footer-partial',
    templateUrl: './footer-partial.component.html',
    styleUrls: ['./footer-partial.component.scss']
})
export class FooterPartialComponent implements OnInit {
    versione: string;
    lang: string;

    constructor(
        private translate: TranslateService
    ) {
        this.lang = this.translate.currentLang.split('-')[0];
    }

    ngOnInit() {
        this.versione = environment.version;
    }

    cultureChange(culture: string) {
        if (culture !== this.translate.currentLang) {
            localStorage.setItem(environment.storage.keys.culture, culture);
            window.location.href = window.location.href;
        }
    }
}
