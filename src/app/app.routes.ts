// app.routes.ts
import { Routes } from '@angular/router';
import { GuestGuard } from '../base/guards/guest-guard';
import { AuthGuard } from '../base/guards/auth-guard';


export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('../presentation/pages/auth/login/login').then(c => c.LoginComponent),

  },
  {
    path: 'register',
    loadComponent: () => import('../presentation/pages/auth/register/register').then(c => c.RegisterComponent),

  },
  {
    path: 'dashboard',
    loadComponent: () => import('../presentation/pages/dashboard/dashboard').then(c => c.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'   
  }
];