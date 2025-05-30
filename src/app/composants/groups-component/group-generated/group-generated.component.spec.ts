import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupGeneratedComponent } from './group-generated.component';

describe('GroupGeneratedComponent', () => {
  let component: GroupGeneratedComponent;
  let fixture: ComponentFixture<GroupGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupGeneratedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
