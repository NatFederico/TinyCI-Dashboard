import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserGuard } from 'src/app/core/guards/user.guard';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./pages/user-home-page/user-home-page.module').then( m => m.UserHomePageModule),
        canActivate: [UserGuard],
        data: {
            roles: []
        }
    },
    {
        path: 'page1',
        loadChildren: () => import('./pages/user-page1-page/user-page1-page.module').then( m => m.UserPage1PageModule),
        canActivate: [UserGuard],
        data: {
            roles: []
        }
    },
    {
        path: 'page2',
        loadChildren: () => import('./pages/user-page2-page/user-page2-page.module').then( m => m.UserPage2PageModule),
        canActivate: [UserGuard],
        data: {
            roles: []
        }
    },
    {
        path: '',
        redirectTo: 'home'
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRouterModule {}
