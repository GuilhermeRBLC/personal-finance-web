import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Accounts } from './pages/accounts/accounts';
import { Transactions } from './pages/transactions/transactions';
import { MainLayout } from './components/main-layout/main-layout';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full' 
    },
    { 
        path: 'login', 
        loadComponent: () => Login 
    },
    { 
        path: 'register', 
        loadComponent: () => Register 
    },

    // Rotas Internas do Sistema
    {
    path: '',
    loadComponent: () => MainLayout,
    canActivate: [authGuard],
    children: [
            { 
                path: 'dashboard', 
                loadComponent: () => Dashboard,
                canActivate: [authGuard]
            },
            { 
                path: 'accounts', 
                loadComponent: () => Accounts ,
                canActivate: [authGuard]
            },
            {
                path: 'transactions', 
                loadComponent: () => Transactions,
                canActivate: [authGuard]
            },
        ]
    },

    { path: '**', redirectTo: 'login' }
];
