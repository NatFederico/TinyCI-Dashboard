import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';
import { CorePagesModule } from './core/core.pages.module';

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
