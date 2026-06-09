import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config';

export interface Account {
  id?: number;
  name: string;
  balance: number;
}

@Service()
export class AccountsService {

    private http = inject(HttpClient);
    private config = inject(ConfigService);

    private apiUrl = `${this.config.apiUrl}/api/accounts`;

    getAccounts(): Observable<Account[]> {
        return this.http.get<Account[]>(`${this.apiUrl}/user`);
    }

    createAccount(account: Account): Observable<Account> {
        return this.http.post<Account>(this.apiUrl, account);
    }

    updateAccount(id: number, account: Account): Observable<Account> {
        return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
    }

    deleteAccount(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}
