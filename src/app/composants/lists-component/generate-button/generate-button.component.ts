import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-button',
  templateUrl: './generate-button.component.html',
  styleUrls: ['./generate-button.component.css']
})
export class GenerateButtonComponent {
  constructor(private router: Router) {}

  goToGroupGenerator() {
    this.router.navigate(['/group']); // ou '/group-generator' selon ta route configurée
  }
}
