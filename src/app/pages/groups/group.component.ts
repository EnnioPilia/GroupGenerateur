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

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GroupHeaderComponent,
    GroupGeneratedComponent,
    GroupHistoryComponent,
  ],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupGeneratorComponent implements OnInit {
  @ViewChild(GroupHistoryComponent) groupHistoryComponent?: GroupHistoryComponent;

  lists: List[] = []; // <-- initialisé vide ici
  selectedListId: string | null = null;
  numberOfGroups = 2;
  errorMessage = '';

  criteria = {
    mixerAncienDwwm: false,
    mixerAge: false,
  };

  constructor(
    private listService: ListService,
    private groupsService: GroupsService
  ) {}


ngOnInit(): void {
  this.lists = this.listService.getLists();

this.lists.forEach(list => {
  if (!list.groupNames) list.groupNames = [];
  list.generatedGroups = [];

  const history = this.groupsService.getHistory(list.id);
  list.groupsSaved = history.length > 0;
  list.showSavedGroups = list.groupsSaved;
  list.showGroups = false; // ✅ Initialise à false
});

}

generateForList(listId: string): void {
  const list = this.lists.find(l => l.id === listId);
  if (!list) return;
  
  list.errorMessage = ''; // reset erreur locale à chaque tentative

  if (!list.persons || list.persons.length < this.numberOfGroups) {
    list.errorMessage = 'Pas assez de personnes pour former autant de groupes.';
    list.generatedGroups = [];
    list.showGroups = false;  // cache les groupes
    return;
  }

  const generatedGroups = this.groupsService.generateGroups(
    list.persons,
    this.numberOfGroups,
    this.criteria,
    listId
  );

  if (!generatedGroups || generatedGroups.length === 0) {
    this.errorMessage = 'Impossible de générer des groupes différents. Essayez de modifier les critères.';
    list.generatedGroups = [];
    list.showGroups = false;  // cache les groupes
    return;
  }

  list.generatedGroups = generatedGroups;
  list.groupNames = generatedGroups.map(g => g.name);
  list.groupsSaved = true;
  list.showSavedGroups = true;
  list.showGroups = true;  // <--- affiche les groupes générés
  list.errorMessage = '';

  this.groupsService.saveGroupsToHistory(listId, generatedGroups);
  this.groupHistoryComponent?.reload();
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

  updateGroupNames(list: List): void {
    if (!list.generatedGroups || !list.groupNames) return;

    list.generatedGroups.forEach((group, i) => {
      if (list.groupNames && list.groupNames[i]) {
        group.name = list.groupNames[i];
      }
    });
  }

  toggleSavedGroupsVisibility(list: List): void {
    list.showSavedGroups = !list.showSavedGroups;
  }
}
