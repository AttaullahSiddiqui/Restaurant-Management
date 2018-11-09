import { TestBed } from '@angular/core/testing';

import { AppToastrService } from './app-toastr.service';

describe('AppToastrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppToastrService = TestBed.get(AppToastrService);
    expect(service).toBeTruthy();
  });
});
