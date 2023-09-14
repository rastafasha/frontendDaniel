import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalbinanceComponent } from './modalbinance.component';

describe('ModalbinanceComponent', () => {
  let component: ModalbinanceComponent;
  let fixture: ComponentFixture<ModalbinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalbinanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalbinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
