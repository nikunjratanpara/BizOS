import { TestBed, inject } from '@angular/core/testing';

import { DynamicViewService } from './dynamic-view.service';

describe('DynamicViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicViewService]
    });
  });

  it('should be created', inject([DynamicViewService], (service: DynamicViewService) => {
    expect(service).toBeTruthy();
  }));
});
