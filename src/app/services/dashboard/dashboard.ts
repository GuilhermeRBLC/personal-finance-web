import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../transactions/transactions';
import { ConfigService } from '../config/config';

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;
  recentTransactions: Transaction[]; // Substitua pelo seu tipo de transação se quiser
}

@Service()
export class DashboardService {

    private http = inject(HttpClient);
    private config = inject(ConfigService);

    private apiUrl = `${this.config.apiUrl}/api/dashboard`;

    getSummary(): Observable<DashboardSummary> {
        return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`);
    }

}
