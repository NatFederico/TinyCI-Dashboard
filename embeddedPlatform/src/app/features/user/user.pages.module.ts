import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UserRouterModule } from './user.router.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        UserRouterModule,
        TranslateModule.forChild()
    ]
})
  export class UserPagesModule { }