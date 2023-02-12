import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { CorePagesModule } from './core/core.pages.module';
import { CallbackPageComponent } from './core/pages/callback-page/callback-page.component';
import { EndSessionPageComponent } from './core/pages/end-session-page/end-session-page.component';
import { SilentPageComponent } from './core/pages/silent-page/silent-page.component';

const routes: Routes = [
  {
      path: '',
      redirectTo: '/dashboard',
      pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo: '/dashboard',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy:  NoPreloading }),
    CorePagesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
