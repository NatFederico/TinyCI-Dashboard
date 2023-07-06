import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserPage2PageComponent } from './user-page2-page.component';

const routes: Routes = [
    {
      path: '',
      component: UserPage2PageComponent
    }
  ];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      TranslateModule.forChild()
    ],
    declarations: [UserPage2PageComponent]
  })
  export class UserPage2PageModule {}