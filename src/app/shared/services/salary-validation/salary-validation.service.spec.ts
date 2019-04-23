import { TestBed } from '@angular/core/testing';

import { SalaryValidationService } from './salary-validation.service';

describe('SalaryValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaryValidationService = TestBed.get(SalaryValidationService);
    expect(service).toBeTruthy();
  });
});
