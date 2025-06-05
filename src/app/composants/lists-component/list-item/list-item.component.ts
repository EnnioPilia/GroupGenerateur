import { Component, EventEmitter, Input, Output } from '@angular/core';
import { List } from '../../../core/models/list.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})

export class ListItemComponent {
  @Input() list!: List;
  @Input() selectedListId: string | null = null;
  @Input() editingListId: string | null = null;
  @Input() editedListName: string = '';
  @Input() item!: { id: number; name: string };

  @Output() selectList = new EventEmitter<string | null>();
  @Output() editListName = new EventEmitter<string>();
  @Output() saveListName = new EventEmitter<string>();
  @Output() deleteList = new EventEmitter<string>();
  @Output() editedListNameChange = new EventEmitter<string>();

  onEditedListNameChange(value: string) {
    this.editedListName = value;
    this.editedListNameChange.emit(this.editedListName);
  }

  onSelectList() {
    this.selectList.emit(this.selectedListId === this.list.id ? null : this.list.id);
  }

  onEditListName() {
    this.editListName.emit(this.list.id);
  }

  onSaveListName() {
    this.saveListName.emit(this.list.id);
  }

  onDeleteList() {
    this.deleteList.emit(this.list.id);
  }
}
