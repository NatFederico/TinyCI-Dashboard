import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/welcome-page/welcome-page.module').then( m => m.WelcomePageModule),
    },
    {
        path: 'template',
        loadChildren: () => import('./pages/board-setup-page/board-setup.module').then( m => m.BoardSetupModule),
    },
    {
        path: 'manage',
        loadChildren: () => import('./pages/board-manage-page/board-manage.module').then( m => m.BoardManageModule),
    },
    {
        path: 'firmware',
        loadChildren: () => import('./pages/board-firmware-page/board-firmware.module').then( m => m.BoardFirmwareModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CoreRouterModule {}