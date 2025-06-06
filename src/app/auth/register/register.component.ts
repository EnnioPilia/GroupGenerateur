import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  // standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passWord: new FormControl('', [Validators.required,Validators.minLength(8)]),
    age: new FormControl(null, [Validators.required, Validators.min(18)])

  });
  constructor(private router: Router) {}

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
            this.router.navigate(['/lists']);

    }
  }
}



