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

  onGenerate() {
    this.generate.emit();
    this.showGroups = true;
  }

  // onGroupNameChange(index: number, newName: string) {
  //   if (this.groups && this.groups[index]) {
  //     this.groups[index].name = newName;
  //   }
  // }

  getInputValue(event: Event): string {
    const input = event.target as HTMLInputElement;
    return input.value;
  }
}
