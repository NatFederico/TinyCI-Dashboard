import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { BoardFirmwareComponent } from "./board-firmware.component";

const routes: Routes = [
    {
        path:'',
        component: BoardFirmwareComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        FormsModule
    ],
    declarations: [BoardFirmwareComponent]
})
export class BoardFirmwareModule {}