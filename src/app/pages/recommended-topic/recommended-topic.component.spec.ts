import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedTopicComponent } from './recommended-topic.component';

describe('RecommendedTopicComponent', () => {
  let component: RecommendedTopicComponent;
  let fixture: ComponentFixture<RecommendedTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
