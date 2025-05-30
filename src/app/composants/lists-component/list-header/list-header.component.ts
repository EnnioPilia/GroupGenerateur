import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})

export class ListHeaderComponent {
  @Input() newListName: string = '';
  @Input() errorMessage: string = '';

  @Output() newListNameChange = new EventEmitter<string>();
  @Output() create = new EventEmitter<void>();

  onNameChange(value: string) {
    this.newListNameChange.emit(value);
  }

  onCreateClick() {
    this.create.emit();
  }
}
