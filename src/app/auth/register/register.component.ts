import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service'; // adapte le chemin si besoin

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    age: new FormControl(null, [Validators.required, Validators.min(18)])
  });

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      const data = {
        name: formValue.name!,
        email: formValue.email!,
        password: formValue.password!,
        age: formValue.age!
      };

    this.authService.register(data).subscribe({
      next: () => {
        console.log('Inscription réussie, redirection...');
        this.router.navigate(['/lists']).then(success => {
          if (!success) {
            console.error('Navigation vers /lists a échoué');
          }
        });
      },
      error: (err) => console.error('Erreur inscription :', err)
    });
    }
  }
}
