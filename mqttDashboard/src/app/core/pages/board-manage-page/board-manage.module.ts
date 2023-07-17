import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {BoardManageComponent} from "./board-manage.component";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const routes: Routes = [
    {
        path: '',
        component: BoardManageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        FormsModule,
        FontAwesomeModule
    ],
    declarations: [BoardManageComponent]
})
export class BoardManageModule {
}
