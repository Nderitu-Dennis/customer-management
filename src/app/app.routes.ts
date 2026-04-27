import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent) },

  { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.RegisterComponent) },

  { path: 'customers', loadComponent: () => import('./pages/customers/customers').then(m => m.CustomersComponent), canActivate: [authGuard] },

  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent), canActivate: [authGuard] },
];