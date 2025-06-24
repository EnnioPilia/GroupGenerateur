import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListsComponent } from './lists.component';
import { ListService } from '../../core/list.services';
import { Router } from '@angular/router';
import { List } from '../../core/models/list.model';
import { Person } from '../../core/models/person.model';

// Stub/mock simple pour ListService
class MockListService {
private lists: List[] = [
  {
    id: '1',
    name: 'Liste 1',
    persons: [],
    draws: 0,
    generatedGroups: [],
    groupName: ['Groupe 1', 'Groupe 2'],
    groupsSaved: false,
    showGroups: false,
    showSavedGroups: false,
    errorMessage: '',
    criteria: {
      mixerAncienDwwm: false,
      mixerAge: false,
    },
  },
  {
    id: '2',
    name: 'Liste 2',
    persons: [],
    draws: 0,
    generatedGroups: [],
    groupName: ['Groupe 1', 'Groupe 2'],
    groupsSaved: false,
    showGroups: false,
    showSavedGroups: false,
    errorMessage: '',
    criteria: {
      mixerAncienDwwm: false,
      mixerAge: false,
    },
  }
];


  getLists() {
    return this.lists;
  }

  addList(name: string): boolean {
    if (this.lists.find(l => l.name === name)) return false;
    this.lists.push({ 
      id: String(this.lists.length + 1), 
      name, 
      persons: [], 
      draws: 0, 
      generatedGroups: [] 
    });
    return true;
  }

  deleteList(id: string) {
    this.lists = this.lists.filter(l => l.id !== id);
  }

  updateList(id: string, name: string, persons: Person[]) {
    const list = this.lists.find(l => l.id === id);
    if (list) {
      list.name = name;
      list.persons = persons;
    }
  }
}

// Stub simple pour Router
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;
  let listService: MockListService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListsComponent],
      providers: [
        { provide: ListService, useClass: MockListService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    listService = TestBed.inject(ListService) as unknown as MockListService;
    router = TestBed.inject(Router) as unknown as MockRouter;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load lists on init', () => {
    expect(component.lists.length).toBe(2);
  });

  it('should create a new list successfully', () => {
    component.newListName = 'Nouvelle Liste';
    component.createList();
    expect(component.errorMessage).toBe('');
    expect(component.lists.find(l => l.name === 'Nouvelle Liste')).toBeTruthy();
  });

  it('should show error if new list name is empty', () => {
    component.newListName = '   ';
    component.createList();
    expect(component.errorMessage).toBe('Veuillez entrer un nom de liste');
  });

  it('should show error if list name already exists', () => {
    component.newListName = 'Liste 1';
    component.createList();
    expect(component.errorMessage).toBe('Ce nom de liste existe déjà.');
  });

  it('should delete a list and clear selection if deleted list was selected', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.selectedListId = '1';
    component.deleteList('1');
    expect(component.lists.find(l => l.id === '1')).toBeFalsy();
    expect(component.selectedListId).toBeNull();
    expect(component.persons.length).toBe(0);
  });

  it('should select and deselect a list', () => {
    component.selectList('1');
    expect(component.selectedListId).toBe('1');
    expect(component.persons).toEqual([]);

    component.selectList('1'); // deselect
    expect(component.selectedListId).toBeNull();
    expect(component.persons).toEqual([]);
  });

  it('should add a person to selected list', () => {
    component.selectList('1');
    component.formPerson = {
      lastName: 'Dupont',
      gender: 'masculin',
      frenchLevel: 3,        // exemple niveau (number)
      isFormerDwwm: false,
      technicalLevel: 2,     // exemple niveau (number)
      profile: 'à l’aise',
      age: 30
    };

    component.submitPerson();

    const list = component.lists.find(l => l.id === '1');
    expect(list?.persons.length).toBe(1);
    expect(list?.persons[0].lastName).toBe('Dupont');
  });

  it('should delete a person from selected list', () => {
    component.selectList('1');
    const person: Person = { 
      id: 'p1', 
      lastName: 'Dupont', 
      gender: 'masculin', 
      frenchLevel: 3, 
      isFormerDwwm: false, 
      technicalLevel: 2, 
      profile: 'à l’aise', 
      age: 30 
    };
    component.lists[0].persons.push(person);

    component.deletePerson('p1');
    expect(component.lists[0].persons.length).toBe(0);
  });

  it('should edit and save list name', () => {
    component.editListName('1');
    expect(component.editingListId).toBe('1');

    component.editedListName = 'Nouvel Intitulé';
    component.saveListName('1');
    expect(component.lists.find(l => l.id === '1')?.name).toBe('Nouvel Intitulé');
    expect(component.editingListId).toBeNull();
  });

  it('should navigate to group generator', () => {
    component.goToGroupGenerator();
    expect(router.navigate).toHaveBeenCalledWith(['/group']);
  });
});
