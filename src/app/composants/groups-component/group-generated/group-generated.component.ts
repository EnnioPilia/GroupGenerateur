import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Group } from '../../../core/models/group.model';

@Component({
  selector: 'app-group-generated',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-generated.component.html',
  styleUrls: ['./group-generated.component.css']
})
export class GroupGeneratedComponent {
  @Input() groups: Group[] = [];
  @Input() groupNames: string[] = [];

  @Output() groupNamesChange = new EventEmitter<string[]>();

  onGroupNameChange(index: number, newName: string) {
    this.groupNames[index] = newName;
    this.groupNamesChange.emit(this.groupNames);
  }

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
