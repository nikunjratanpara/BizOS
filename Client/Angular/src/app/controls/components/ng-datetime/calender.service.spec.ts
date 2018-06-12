import { TestBed, inject } from '@angular/core/testing';

import { CalenderServiceService } from './calender-service.service';

describe('CalenderServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalenderServiceService]
    });
  });

  it('should be created', inject([CalenderServiceService], (service: CalenderServiceService) => {
    expect(service).toBeTruthy();
  }));
});
