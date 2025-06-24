import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

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
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = ''; // reset erreur
this.authService.login({ email: this.email, password: this.password }).subscribe({
  next: (response) => {
    console.log('Réponse login:', response);  // <-- affiche la réponse complète
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      console.log('Token stocké:', localStorage.getItem('token'));  // vérifie si bien stocké
      this.router.navigateByUrl('/lists');
    } else {
      this.errorMessage = 'Réponse invalide du serveur';
    }
  },
  error: (err) => {
    console.error('Login error', err);
    this.errorMessage = 'Email ou mot de passe incorrect';
  }
});

  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
