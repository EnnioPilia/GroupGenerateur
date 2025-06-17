import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loginResult$?: Observable<any>; // Observable pour la réponse
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

 onSubmit(): void {
  this.errorMessage = ''; // reset erreur
  this.authService.login({ email: this.email, password: this.password }).subscribe({
    next: (response) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token); // stocker le token
        this.router.navigateByUrl('/lists');          // naviguer après succès
      } else {
        this.errorMessage = 'Réponse invalide du serveur';
      }
    },
    error: (err) => {
      console.error('Login error', err);
      this.errorMessage = err.error || 'Email ou mot de passe incorrect';
    }
  });
}


  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
