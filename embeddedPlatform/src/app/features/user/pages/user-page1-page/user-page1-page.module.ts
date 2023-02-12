import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserPage1PageComponent } from './user-page1-page.component';

const routes: Routes = [
    {
      path: '',
      component: UserPage1PageComponent
    }
  ];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      TranslateModule.forChild()
    ],
    declarations: [UserPage1PageComponent]
  })
  export class UserPage1PageModule {}