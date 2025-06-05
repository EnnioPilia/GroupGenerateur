import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupHeaderComponent } from './group-header.component';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [GroupHeaderComponent],
  template: `
    <app-group-header
      [(numberOfGroups)]="numberOfGroups"
      [(criteria)]="criteria"
      [list]="list"
    ></app-group-header>
  `
})
class TestHostComponent {
  numberOfGroups = 3;
  criteria = {
    mixerAncienDwwm: true,
    mixerAge: false
  };
  list = {
    id: 'g1',
    name: 'Groupe test',
    persons: []
  };
}


describe('GroupHeaderComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should render initial number of groups', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="number"]');
    expect(input.value).toBe('3');
  });

  it('should emit updated number of groups on input change', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="number"]');
    input.value = '5';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(hostComponent.numberOfGroups).toBe(5);
  });

it('should bind and emit criteria changes', () => {
  const checkboxes: NodeListOf<HTMLInputElement> = fixture.nativeElement.querySelectorAll('input[type="checkbox"]');
  checkboxes[0].click();  // clic sur mixerAge
  fixture.detectChanges();
  expect(hostComponent.criteria.mixerAge).toBe(true);
});

});
