import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Account {
  id?: number;
  name: string;
  balance: number;
  userId: number;
}

@Service()
export class AccountsService {

    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:8080/api/accounts';

    getAccounts(): Observable<Account[]> {
        const userId = localStorage.getItem('token');
        return this.http.get<Account[]>(`${this.apiUrl}/user/${userId}`);
    }

    createAccount(account: Account): Observable<Account> {
        const userId = localStorage.getItem('token');
        account.userId = parseInt(userId || "0");
        return this.http.post<Account>(this.apiUrl, account);
    }

    updateAccount(id: number, account: Account): Observable<Account> {
        const userId = localStorage.getItem('token');
        account.userId = parseInt(userId || "0");
        return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
    }

    deleteAccount(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
