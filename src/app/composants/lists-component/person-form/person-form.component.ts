import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../../core/models/person.model';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})

export class PersonFormComponent {
  @Input() formPerson: Partial<Person> = {
    lastName: '',
    gender: 'masculin',
    frenchLevel: 1,
    isFormerDwwm: false,
    technicalLevel: 1,
    profile: 'timide',
    age: null
  };

  @Output() submitPerson = new EventEmitter<Partial<Person>>();

  onSubmit() {
    this.submitPerson.emit(this.formPerson);
  }
}
