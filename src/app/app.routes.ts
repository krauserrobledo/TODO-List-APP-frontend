// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from '../base/guards/auth-guard';
import { GuestGuard } from '../base/guards/guest-guard';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('../presentation/pages/auth/login/login').then(c => c.LoginComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('../presentation/pages/auth/register/register').then(c => c.RegisterComponent),
    canActivate: [GuestGuard]
  },
  {
    path: '**',
    redirectTo: 'login'   
  }
];