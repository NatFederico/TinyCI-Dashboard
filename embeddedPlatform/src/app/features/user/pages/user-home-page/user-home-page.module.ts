import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserHomePageComponent } from './user-home-page.component';

const routes: Routes = [
    {
      path: '',
      component: UserHomePageComponent
    }
  ];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      TranslateModule.forChild()
    ],
    declarations: [UserHomePageComponent]
  })
  export class UserHomePageModule {}