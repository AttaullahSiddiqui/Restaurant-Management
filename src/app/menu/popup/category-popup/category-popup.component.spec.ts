import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPopupComponent } from './category-popup.component';

describe('CategoryPopupComponent', () => {
  let component: CategoryPopupComponent;
  let fixture: ComponentFixture<CategoryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
