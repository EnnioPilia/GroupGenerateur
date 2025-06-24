import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsService } from '../../../core/groups.service';
import { Group } from '../../../core/models/group.model';
import { ListService } from '../../../core/list.services'; // IMPORTANT
import { List } from '../../../core/models/list.model';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-group-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './group-history.component.html',
  styleUrls: ['./group-history.component.css']
})
export class GroupHistoryComponent implements OnInit {
  @Input() listId!: string;
  list?: List;  
  history: Group[][] = [];
  @Output() delete = new EventEmitter<void>();

  isAdmin = false; // <--- ajout

  constructor(
    private groupsService: GroupsService,
    private listService: ListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadList();
    this.loadHistory();

    this.isAdmin = this.authService.isAdmin();  // <--- récupère le rôle admin
        console.log('Is Admin:', this.isAdmin);  // Pour debug

  }

  loadList(): void {
    const lists = this.listService.getLists();
    this.list = lists.find(l => l.id === this.listId);
  }

  loadHistory(): void {
    this.history = this.groupsService.getHistory(this.listId);
  }

  reload(): void {
    this.loadHistory();
  }
}
