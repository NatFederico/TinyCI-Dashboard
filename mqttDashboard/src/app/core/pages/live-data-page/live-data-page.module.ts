import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";
import {LiveDataPageComponent} from "./live-data-page.component";
import {RealtimeChartModule} from "ngx-graph";

const routes: Routes = [
    {
        path: '',
        component: LiveDataPageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        FontAwesomeModule,
        RealtimeChartModule
    ],
    declarations: [LiveDataPageComponent]
})

export class LiveDataPageModule {
}
