import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCategoryPopupComponent } from './employee-category-popup.component';

describe('EmployeeCategoryPopupComponent', () => {
  let component: EmployeeCategoryPopupComponent;
  let fixture: ComponentFixture<EmployeeCategoryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCategoryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCategoryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
