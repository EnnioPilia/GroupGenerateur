import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface RegisterRequest {
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/auth';

  register(data: RegisterRequest): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

getRoleFromToken(): string | null {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decodedToken: any = jwtDecode(token);
    console.log('Token décodé:', decodedToken);

    if (decodedToken.role) {
      // Enlève "ROLE_" si présent
      return decodedToken.role.replace(/^ROLE_/i, '');
    }
    return null;
  } catch (e) {
    console.error('Erreur lors du décodage du token', e);
    return null;
  }
}


    isAdmin(): boolean {
    return this.getRoleFromToken()?.toLowerCase() === 'admin';
  }
}
