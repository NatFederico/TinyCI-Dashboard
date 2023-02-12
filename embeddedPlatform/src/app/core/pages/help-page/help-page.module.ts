import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HelpPageComponent } from './help-page.component';

const routes: Routes = [
    {
      path: '',
      component: HelpPageComponent
    }
  ];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      TranslateModule.forChild()
    ],
    declarations: [HelpPageComponent]
  })
  export class HelpPageModule {}