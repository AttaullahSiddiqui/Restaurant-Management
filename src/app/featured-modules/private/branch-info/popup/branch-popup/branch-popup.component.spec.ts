import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchPopupComponent } from './branch-popup.component';

describe('BranchPopupComponent', () => {
  let component: BranchPopupComponent;
  let fixture: ComponentFixture<BranchPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
