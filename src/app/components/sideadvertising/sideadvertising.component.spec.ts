import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideadvertisingComponent } from './sideadvertising.component';

describe('SideadvertisingComponent', () => {
  let component: SideadvertisingComponent;
  let fixture: ComponentFixture<SideadvertisingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideadvertisingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideadvertisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
