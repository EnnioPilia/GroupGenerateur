import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../../../core/models/person.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class PersonTableComponent {
@Input() persons?: Person[];
  @Output() deletePerson = new EventEmitter<string>();

  onDeletePerson(personId: string) {
    this.deletePerson.emit(personId);
  }
}
