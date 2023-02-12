import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BoardSetupComponent } from "./board-setup.component";

const routes: Routes = [
    {
        path:'',
        component: BoardSetupComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        FormsModule
    ],
    declarations: [BoardSetupComponent]
})
export class BoardSetupModule {}