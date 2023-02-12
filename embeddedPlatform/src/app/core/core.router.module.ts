import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'help',
        loadChildren: () => import('./pages/help-page/help-page.module').then( m => m.HelpPageModule),
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/welcome-page/welcome-page.module').then( m => m.WelcomePageModule),
    },
    {
        path: 'template',
        loadChildren: () => import('../features/board/pages/board-setup/board-setup.module').then( m => m.BoardSetupModule),
    },
    {
        path: 'manage',
        loadChildren: () => import('../features/board/pages/board-manage/board-manage.module').then( m => m.BoardManageModule),
    },
    {
        path: 'firmware',
        loadChildren: () => import('../features/board/pages/board-firmware/board-firmware.module').then( m => m.BoardFirmwareModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CoreRouterModule {}