import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesFollowComponent } from './articles-follow.component';

describe('ArticlesFollowComponent', () => {
  let component: ArticlesFollowComponent;
  let fixture: ComponentFixture<ArticlesFollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesFollowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesFollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
