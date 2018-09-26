import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsStatusComponent } from './bills-status.component';

describe('BillsStatusComponent', () => {
  let component: BillsStatusComponent;
  let fixture: ComponentFixture<BillsStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
