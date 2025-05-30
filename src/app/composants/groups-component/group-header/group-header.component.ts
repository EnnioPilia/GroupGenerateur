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
  @Input() numberOfGroups: number = 2;
  @Input() criteria = {
    mixerAncienDwwm: false,
    mixerAge: false
  };

  @Output() generate = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() numberOfGroupsChange = new EventEmitter<number>();
  @Output() criteriaChange = new EventEmitter<any>();

  onNumberChange(newValue: number) {
    this.numberOfGroups = newValue;
    this.numberOfGroupsChange.emit(this.numberOfGroups);
  }

  onCriteriaChange() {
    this.criteriaChange.emit(this.criteria);
  }
}
