import { Routes } from '@angular/router';
import { ErrorComponent } from './home/error/error.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: ()=> import('./home/home.routes').then(m=>m.home_routes)
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.routes').then(m=>m.auth_routes),
        canActivate:[noAuthGuard]
    },
    {
        path: 'games',
        loadChildren: ()=> import('./console/console.routes').then(m=>m.console_routes),
        canActivate:[authGuard]
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
