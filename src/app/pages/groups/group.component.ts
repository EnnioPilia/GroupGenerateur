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
  archives: any[] = [];     // Où tu stockes les archives

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
      if (!list.groupNames) list.groupNames = [];
      if (!list.generatedGroups) list.generatedGroups = [];

      const history = this.groupsService.getHistory(list.id);
      list.groupsSaved = history.length > 0;
      list.showSavedGroups = list.groupsSaved;
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

    if (!generatedGroups || generatedGroups.length === 0) {
      list.errorMessage = 'Impossible de générer des groupes différents. Essayez de modifier les critères.';
      list.generatedGroups = [];
      list.showGroups = false;
      return;
    }

    list.generatedGroups = generatedGroups;

    // Initialiser les noms de groupe (avec fallback "Groupe 1", etc)
list.groupNames = generatedGroups.map((g, i) => g.name || `Groupe ${i + 1}`);

    list.groupsSaved = false;
    list.showSavedGroups = false;
    list.showGroups = true;

    this.groupHistoryComponent?.reload();
  }

updateGroupNames(list: List, groupNames: string[]) {
  list.groupNames = [...groupNames];
  list.generatedGroups?.forEach((group, i) => {
    if (groupNames[i]) {
      group.name = groupNames[i];
    }
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
