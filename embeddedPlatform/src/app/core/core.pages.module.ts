import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CoreRouterModule } from './core.router.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        CoreRouterModule,
        TranslateModule.forChild()
    ]
})
  export class CorePagesModule { }