import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Accounts } from './pages/accounts/accounts';
import { Transactions } from './pages/transactions/transactions';
import { MainLayout } from './components/main-layout/main-layout';

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
    children: [
            { 
                path: 'dashboard', 
                loadComponent: () => Dashboard 
            },
            { 
                path: 'accounts', 
                loadComponent: () => Accounts 
            },
            {
                path: 'transactions', 
                loadComponent: () => Transactions 
            },
        ]
    },

    { path: '**', redirectTo: 'login' }
];
