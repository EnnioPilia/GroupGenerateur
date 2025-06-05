import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupGeneratedComponent } from './group-generated.component';

describe('GroupGeneratedComponent', () => {
  let component: GroupGeneratedComponent;
  let fixture: ComponentFixture<GroupGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupGeneratedComponent], // car standalone
    }).compileComponents();

    fixture = TestBed.createComponent(GroupGeneratedComponent);
    component = fixture.componentInstance;
  });

it('should display error message when set', () => {
  component.errorMessage = 'Erreur de test';
  fixture.detectChanges();

  const errorElement = fixture.nativeElement.querySelector('.error');
  expect(errorElement).toBeTruthy();  // L’élément existe bien
  expect(errorElement.textContent).toContain('Erreur de test');  // Le texte correspond
});

});
