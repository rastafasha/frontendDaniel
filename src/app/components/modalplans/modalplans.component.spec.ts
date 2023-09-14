import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalplansComponent } from './modalplans.component';

describe('ModalplansComponent', () => {
  let component: ModalplansComponent;
  let fixture: ComponentFixture<ModalplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalplansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
