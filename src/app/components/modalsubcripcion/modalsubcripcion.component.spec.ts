import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalsubcripcionComponent } from './modalsubcripcion.component';

describe('ModalsubcripcionComponent', () => {
  let component: ModalsubcripcionComponent;
  let fixture: ComponentFixture<ModalsubcripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalsubcripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalsubcripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
