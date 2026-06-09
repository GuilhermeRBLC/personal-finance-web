import { Service } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ConfigService } from '../config/config';

export interface LoginResponse {
  token: string;
  userName: string;
}

@Service()
export class AuthService {
    private http = inject(HttpClient);
    private config = inject(ConfigService);

    private apiUrl = `${this.config.apiUrl}/api/users`;

    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, userData);
    }

    login(credentials: any): Observable<any> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
            tap(response => {
                localStorage.setItem("token", response.token);
                localStorage.setItem("username", response.userName);
            })
        );
    }

    logout(): void {
        localStorage.removeItem("token");
    }

    getUserName(): string | null {
        return localStorage.getItem("username");
    }

    getToken(): string | null {
        return localStorage.getItem("token");
    }
}
