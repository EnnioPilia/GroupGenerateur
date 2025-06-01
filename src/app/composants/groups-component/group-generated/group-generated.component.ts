import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Group } from '../../../core/models/group.model';
import { List } from '../../../core/models/list.model';

@Component({
  selector: 'app-group-generated',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-generated.component.html',
  styleUrls: ['./group-generated.component.css']
})
export class GroupGeneratedComponent {
  @Input() groups: Group[] = [];
  @Input() list!: List;

  @Output() generate = new EventEmitter<void>();

  showGroups: boolean = false;
  @Input() errorMessage: string = '';
  isFocused: boolean[] = [];

  tirageName: string = '';
  placeholder: string = 'Entrez le nom du groupe';

  clearPlaceholder() {
    this.placeholder = '';
  }

  resetPlaceholder() {
    this.placeholder = 'Entrez le nom du groupe';
  }

  onGenerate() {
    this.generate.emit();
    this.showGroups = true;
    this.tirageName = '';
  }

  getInputValue(event: Event): string {
    const input = event.target as HTMLInputElement;
    return input.value;
  }
  
  // generateGroups(): void {
  // if (!this.tirageName.trim()) {
  //   alert('Veuillez entrer un nom de tirage.');
  //   return;
  // }


  
  // onGroupNameChange(index: number, newName: string) {
  //   if (this.groups && this.groups[index]) {
  //     this.groups[index].name = newName;
  //   }
  // }

}

