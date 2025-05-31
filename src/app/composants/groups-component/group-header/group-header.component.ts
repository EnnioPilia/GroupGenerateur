import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { List } from '../../../core/models/list.model';

@Component({
  selector: 'app-group-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.css']
})
export class GroupHeaderComponent {
  @Input() list!: List;
  @Input() criteria = {
    mixerAncienDwwm: false,
    mixerAge: false
  };
  @Input() groupNames: string[] = [];
  @Output() groupNamesChange = new EventEmitter<string[]>();
  @Input() tirageName: string = '';
  @Output() tirageNameChange = new EventEmitter<string>();
  @Output() generate = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() criteriaChange = new EventEmitter<any>();

@Input() numberOfGroups!: number;
@Output() numberOfGroupsChange = new EventEmitter<number>();

onNumberChange(event: any) {
  const value = +event.target.value;
  this.numberOfGroupsChange.emit(value);
}
  onCriteriaChange() {
    this.criteriaChange.emit(this.criteria);
  }
  onGroupNamesInput(value: string) {
    const groups = value.split(',').map(s => s.trim());
    this.groupNamesChange.emit(groups);
  }
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value || ''; // <- sécurisé contre null
    console.log(value);
  }

}
