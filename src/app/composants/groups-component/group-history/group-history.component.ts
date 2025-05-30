import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsService } from '../../../core/groups.service';
import { Group } from '../../../core/models/group.model';

@Component({
  selector: 'app-group-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-history.component.html',
  styleUrls: ['./group-history.component.css']
})
export class GroupHistoryComponent implements OnInit {
  @Input() listId!: string;
  history: Group[][] = [];
  @Output() delete = new EventEmitter<void>();

  constructor(private groupsService: GroupsService) {}

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.history = this.groupsService.getHistory(this.listId);
  }

  reload(): void {
    this.loadHistory();
  }
}
