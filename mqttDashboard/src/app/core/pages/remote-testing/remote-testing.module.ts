import { RouterModule, Routes } from "@angular/router";
import { RemoteTestingComponent } from "./remote-testing.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TranslateModule } from "@ngx-translate/core";
import { RealtimeChartModule } from "ngx-graph";

const routes: Routes = [
    {
      path: '',
      component: RemoteTestingComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        FontAwesomeModule,
    ],
    declarations: [RemoteTestingComponent]
})

export class RemoteTestingModule { 

}