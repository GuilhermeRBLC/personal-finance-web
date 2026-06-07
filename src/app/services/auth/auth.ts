import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class AuthService {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:8080/api/users';

    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, userData);
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials);
    }
}
