import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';
import {WelcomePageComponent} from './welcome-page.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomePageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        FontAwesomeModule
    ],
    declarations: [WelcomePageComponent]
})
export class WelcomePageModule {
}
