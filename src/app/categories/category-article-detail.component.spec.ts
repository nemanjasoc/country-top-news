import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryArticleDetailComponent } from './category-article-detail.component';

describe('CategoryArticleDetailComponent', () => {
  let component: CategoryArticleDetailComponent;
  let fixture: ComponentFixture<CategoryArticleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryArticleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
