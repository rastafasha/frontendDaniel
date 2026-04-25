import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesHomeComponent } from './favorites-home.component';

describe('FavoritesHomeComponent', () => {
  let component: FavoritesHomeComponent;
  let fixture: ComponentFixture<FavoritesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
