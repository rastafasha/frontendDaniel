import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffpicsComponent } from './staffpics.component';

describe('StaffpicsComponent', () => {
  let component: StaffpicsComponent;
  let fixture: ComponentFixture<StaffpicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffpicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffpicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
