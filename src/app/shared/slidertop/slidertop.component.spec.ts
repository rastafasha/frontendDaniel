import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidertopComponent } from './slidertop.component';

describe('SlidertopComponent', () => {
  let component: SlidertopComponent;
  let fixture: ComponentFixture<SlidertopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidertopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidertopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
