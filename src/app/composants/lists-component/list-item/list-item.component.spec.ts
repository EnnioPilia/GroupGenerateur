import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './list-item.component';
import { List } from '../../../core/models/list.model';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  const mockList: List = {
    id: '1',
    name: 'Test List',
    persons: [],
    draws: 0,
    generatedGroups: [],
    // ajoute ici les propriétés requises par ton modèle
  };

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [ListItemComponent]  // <-- changer declarations en imports
  }).compileComponents();

  fixture = TestBed.createComponent(ListItemComponent);
  component = fixture.componentInstance;

  // Initialise l'input avant detectChanges
  component.list = mockList;

  fixture.detectChanges();
});


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
