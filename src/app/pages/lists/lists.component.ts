import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../../core/list.services';
import { List } from '../../core/models/list.model';
import { Person } from '../../core/models/person.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListHeaderComponent } from '../../composants/lists-component/list-header/list-header.component'; // adapte le chemin si besoin
import { GenerateButtonComponent } from '../../composants/lists-component/generate-button/generate-button.component';
import { ListItemComponent } from '../../composants/lists-component/list-item/list-item.component';
import { PersonFormComponent } from '../../composants/lists-component/person-form/person-form.component';
import { PersonTableComponent } from '../../composants/lists-component/person-table/person-table.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ListItemComponent,
    PersonFormComponent,
    PersonTableComponent,
    ListHeaderComponent,
    GenerateButtonComponent
  ],
  encapsulation: ViewEncapsulation.None  // <--- Important !

})
export class ListsComponent implements OnInit {

  lists: List[] = [];
  newListName: string = '';
  errorMessage: string = '';
  persons: Person[] = [];
  selectedListId: string | null = null;
  editingListId: string | null = null;
  editedListName: string = '';

  formPerson: any = {
    lastName: '',
    gender: '',
    frenchLevel: '',
    isFormerDwwm: false,
    technicalLevel: '',
    profile: '',
    age: null,
  };

  constructor(private listService: ListService, private router: Router) { }

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    this.lists = this.listService.getLists();
  }

  createList() {
    const name = this.newListName.trim();
    if (name === "") {
      this.errorMessage = 'Veuillez entrer un nom de liste';
      return;
    }

    const success = this.listService.addList(name);
    if (!success) {
      this.errorMessage = 'Ce nom de liste existe déjà.';
      return;
    }

    this.newListName = '';
    this.errorMessage = '';
    this.loadLists();
  }

  deleteList(listId: string) {
    if (confirm('Voulez-vous vraiment supprimer cette liste ?')) {
      this.listService.deleteList(listId);
      if (this.selectedListId === listId) {
        this.selectedListId = null;
        this.persons = [];
      }
      this.loadLists();
    }
  }

  selectList(id: string | null) {
    if (this.selectedListId === id) {
      this.selectedListId = null;
      this.persons = [];
    } else {
      this.selectedListId = id;
      const list = this.lists.find(l => l.id === id);
      this.persons = list ? list.persons : [];
    }

    this.formPerson = {
      lastName: '',
      gender: '',
      frenchLevel: '',
      isFormerDwwm: false,
      technicalLevel: '',
      profile: '',
      age: null,
    };
  }


  submitPerson() {
    if (this.selectedListId) {
      const selectedList = this.lists.find(l => l.id === this.selectedListId);
      if (selectedList) {
        const newPerson = {
          ...this.formPerson,
          id: crypto.randomUUID()
        };

        selectedList.persons.push(newPerson);
        this.listService.updateList(selectedList.id, selectedList.name, selectedList.persons);

        this.formPerson = {
          lastName: '',
          gender: '',
          frenchLevel: '',
          isFormerDwwm: false,
          technicalLevel: '',
          profile: '',
          age: null,
        };

        this.loadLists();
      }
    }
  }

  deletePerson(personId: string) {
    if (!this.selectedListId) return;
    const list = this.lists.find(l => l.id === this.selectedListId);
    if (!list) return;

    list.persons = list.persons.filter(p => p.id !== personId);
    this.listService.updateList(list.id, list.name, list.persons);
    this.persons = list.persons;
  }

  getSelectedList(): List | undefined {
    return this.lists.find(l => l.id === this.selectedListId!);
  }

  editListName(listId: string) {
    const list = this.lists.find(l => l.id === listId);
    if (list) {
      this.editingListId = listId;
      this.editedListName = list.name;
    }
  }

saveListName(listId: string, newName: string) {
  const list = this.lists.find(l => l.id === listId);
  if (list && newName.trim()) {
    list.name = newName.trim();
    this.listService.updateList(list.id, list.name, list.persons);
    this.editingListId = null;
    this.loadLists();
  }
}


  goToGroupGenerator() {
    this.router.navigate(['/group']);
  }
}
