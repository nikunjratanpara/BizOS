import { TestBed, inject } from '@angular/core/testing';

import { DataComboService } from './data-combo.service';

describe('DataComboServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataComboService]
    });
  });

  it('should be created', inject([DataComboService], (service: DataComboService) => {
    expect(service).toBeTruthy();
  }));
});
