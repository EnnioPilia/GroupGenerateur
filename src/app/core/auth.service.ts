import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

login(email: string, password: string): Observable<void> {
  return this.http.post<{ token: string }>('http://localhost:8080/auth/login', { email, password }, { withCredentials: true })
    .pipe(
      tap(() => {
        // Pas besoin de stocker le token, cookie HttpOnly est utilisé automatiquement par le navigateur
      }),
      map(() => void 0),
      catchError(err => {
        console.error('Erreur de login:', err);
        return throwError(() => err);
      })
    );
}

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
register(data: { name: string; email: string; password: string; age: number; role?: string }): Observable<any> {
  return this.http.post('http://localhost:8080/auth/register', data).pipe(
    tap(response => console.log('Inscription réussie', response)),
    catchError(err => {
      console.error('Erreur lors de l’inscription:', err);
      return throwError(() => err);
    })
  );
}

}
