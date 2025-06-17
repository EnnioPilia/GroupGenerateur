import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder  // injecte FormBuilder pour faciliter la création du formulaire
  ) {
    this.registerForm = this.fb.group({
      // name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      // age: ['', [Validators.required, Validators.min(18)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

onSubmit(): void {
  this.errorMessage = '';

  if (this.registerForm.invalid) {
    this.errorMessage = 'Formulaire invalide';
    return;
  }

  const { email, password } = this.registerForm.value;

this.authService.register({ email, password }).subscribe({
  next: (message) => {
    console.log('Inscription OK:', message);
    this.router.navigateByUrl('/login');  // on va vers login pour que l'utilisateur se connecte
  },
  error: (error) => {
    this.errorMessage = error.error || 'Erreur lors de la création du compte';
  }
});
}

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
