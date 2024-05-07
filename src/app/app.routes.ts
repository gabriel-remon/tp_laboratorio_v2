import { Routes } from '@angular/router';
import { ErrorComponent } from './home/error/error.component';

export const routes: Routes = [
    {
        path: '',
        loadChildren: ()=> import('./home/home.routes').then(m=>m.home_routes)
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.routes').then(m=>m.auth_routes)
    },
    {
        path: 'games',
        loadChildren: ()=> import('./console/console.routes').then(m=>m.console_routes)
    },
    {
        path: '**',
        component: ErrorComponent
    }
];
