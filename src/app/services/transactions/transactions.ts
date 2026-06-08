import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  accountId: number;
}

@Service()
export class TransactionsService {
    
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:8080/api/transactions';

    getTransactions(): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.apiUrl}/user`);
    }

    createTransaction(transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(this.apiUrl, transaction);
    }

    updateTransaction(id: number, transaction: Transaction): Observable<Transaction> {
        return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction);
    }

    deleteTransaction(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


}
