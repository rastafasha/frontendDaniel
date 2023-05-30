import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhotofollowComponent } from './whotofollow.component';

describe('WhotofollowComponent', () => {
  let component: WhotofollowComponent;
  let fixture: ComponentFixture<WhotofollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhotofollowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhotofollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
