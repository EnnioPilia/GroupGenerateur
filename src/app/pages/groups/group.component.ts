import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListService } from '../../core/list.services';
import { GroupsService } from '../../core/groups.service';

import { List } from '../../core/models/list.model';
import { Group } from '../../core/models/group.model';

import { GroupHeaderComponent } from '../../composants/groups-component/group-header/group-header.component';
import { GroupGeneratedComponent } from '../../composants/groups-component/group-generated/group-generated.component';
import { GroupHistoryComponent } from '../../composants/groups-component/group-history/group-history.component';
import { GroupTitleComponent } from '../../composants/groups-component/group-title/group-title.component';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GroupHeaderComponent,
    GroupGeneratedComponent,
    GroupHistoryComponent,
    GroupTitleComponent
  ],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupGeneratorComponent implements OnInit {
  @ViewChild(GroupHistoryComponent) groupHistoryComponent?: GroupHistoryComponent;
  archives: any[] = [];

  lists: List[] = [];

  numberOfGroups = 2;
  criteria = {
    mixerAncienDwwm: false,
    mixerAge: false,
  };

  constructor(
    private listService: ListService,
    private groupsService: GroupsService
  ) { }

  ngOnInit(): void {
    this.lists = this.listService.getLists();

    this.lists.forEach(list => {
      if (!list.groupName) list.groupName = [];
      if (!list.generatedGroups) list.generatedGroups = [];

      const history = this.groupsService.getHistory(list.id);
      list.groupsSaved = history.length > 0;
      list.showSavedGroups = list.groupsSaved;
      list.showSavedGroups = false;
      list.showGroups = false;
      list.errorMessage = '';
    });
    
  }

  generateForList(listId: string): void {
    const list = this.lists.find(l => l.id === listId);
    if (!list) return;
    console.log('Nombre de groupes choisi:', this.numberOfGroups);

    list.errorMessage = '';

    if (!list.persons || list.persons.length < this.numberOfGroups) {
      list.errorMessage = 'Pas assez de personnes pour former autant de groupes.';
      list.generatedGroups = [];
      list.showGroups = false;
      return;
    }

    const generatedGroups = this.groupsService.generateGroups(
      list.persons,
      this.numberOfGroups,
      this.criteria,
      listId
    );
    if (!list.groupName || list.groupName.length !== list.generatedGroups.length) {
      list.groupName = list.generatedGroups.map((_, i) => `Groupe ${i + 1}`);
    }

    if (!generatedGroups || generatedGroups.length === 0) {
      list.errorMessage = 'Impossible de générer des groupes différents. Essayez de modifier les critères.';
      list.generatedGroups = [];
      list.showGroups = false;
      return;
    }

    list.generatedGroups = generatedGroups;

    list.groupName = generatedGroups.map(() => `Entrez le nom du groupe`);

    list.groupsSaved = false;
    list.showSavedGroups = false;
    list.showGroups = true;

    this.groupHistoryComponent?.reload();
  }

  updateGroupNames(list: List, newGroupName: string) {
    // Si tu veux que tous les groupes aient ce même nom
    list.groupName = list.generatedGroups.map(() => newGroupName);

    list.generatedGroups.forEach(group => {
      group.name = newGroupName;
    });
  }


  deleteSavedGroups(listId: string): void {
    this.groupsService.clearHistory(listId);

    const list = this.lists.find(l => l.id === listId);
    if (list) {
      list.generatedGroups = [];
      list.groupsSaved = false;
      list.showSavedGroups = false;
    }

    this.groupHistoryComponent?.reload();
  }

  toggleSavedGroupsVisibility(list: List): void {
    list.showSavedGroups = !list.showSavedGroups;
  }

  updateTirageName(list: List, newTirageName: string): void {
    list.tirageName = newTirageName;
  }

  archiveGroups(listId: string): void {
    const list = this.lists.find(l => l.id === listId);
    if (!list || !list.generatedGroups) return;

    this.groupsService.saveGroupsToHistory(listId, list.generatedGroups);
    list.groupsSaved = true;
    list.showSavedGroups = true;

    this.groupHistoryComponent?.reload();
  }
}
