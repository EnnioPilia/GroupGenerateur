import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupGeneratedComponent } from '../../composants/groups-component/group-generated/group-generated.component';
import { Group } from '../../core/models/group.model';
import { List } from '../../core/models/list.model';
import { Person } from '../../core/models/person.model';
import { By } from '@angular/platform-browser';

describe('GroupGeneratedComponent', () => {
  let component: GroupGeneratedComponent;
  let fixture: ComponentFixture<GroupGeneratedComponent>;

  // Mocks conformes aux interfaces
  const mockPersons: Person[] = [
    {
      id: '1',
      lastName: 'Durand',
      gender: 'masculin',
      frenchLevel: 3,
      isFormerDwwm: false,
      technicalLevel: 2,
      profile: 'réservé',
      age: 25,
    },
    {
      id: '2',
      lastName: 'Lemoine',
      gender: 'féminin',
      frenchLevel: 4,
      isFormerDwwm: true,
      technicalLevel: 3,
      profile: 'à l’aise',
      age: 30,
    },
  ];

  const mockGroups: Group[] = [
    {
      id: 'g1',
      name: 'Groupe 1',
      persons: [mockPersons[0]],
    },
    {
      id: 'g2',
      name: 'Groupe 2',
      persons: [mockPersons[1]],
    },
  ];

  const mockList: List = {
    id: 'list1',
    name: 'Liste test',
    draws: 0,
    persons: mockPersons,
    groupName: ['Groupe 1', 'Groupe 2'],
    generatedGroups: mockGroups,
    groupsSaved: false,
    showGroups: false,
    showSavedGroups: false,
    errorMessage: '',
    criteria: {
      mixerAncienDwwm: false,
      mixerAge: false,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupGeneratedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupGeneratedComponent);
    component = fixture.componentInstance;
    component.groups = mockGroups;
    component.list = mockList;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should display error message when set', () => {
  component.errorMessage = 'Erreur de test';
  fixture.detectChanges();
  const errorElem = fixture.debugElement.query(By.css('.error'));  // <-- ici
  expect(errorElem).toBeTruthy(); // utile pour éviter erreur si null
  expect(errorElem.nativeElement.textContent).toContain('Erreur de test');
});


  it('should emit generate event and reset tirageName on onGenerate', () => {
    spyOn(component.generate, 'emit');
    component.tirageName = 'Nom Test';
    component.onGenerate();
    expect(component.generate.emit).toHaveBeenCalled();
    expect(component.showGroups).toBeTrue();
    expect(component.tirageName).toBe('');
  });

  it('should clear and reset placeholder', () => {
    component.clearPlaceholder();
    expect(component.placeholder).toBe('');
    component.resetPlaceholder();
    expect(component.placeholder).toBe('Entrez le nom du groupe');
  });

  it('should get input value from event', () => {
    const inputEvent = {
      target: { value: 'test value' },
    } as unknown as Event;
    const value = component.getInputValue(inputEvent);
    expect(value).toBe('test value');
  });
});
