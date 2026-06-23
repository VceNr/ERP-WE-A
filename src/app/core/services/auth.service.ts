import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private base = `${environment.apiUrl}/auth`;

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.base}/login`, { username, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard/overview']);
      })
    );
  }

  logout() {
    return this.http.post(`${this.base}/logout`, {}).pipe(
      tap(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
