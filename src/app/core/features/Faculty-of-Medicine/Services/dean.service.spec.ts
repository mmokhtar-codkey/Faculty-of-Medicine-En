/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeanService } from './dean.service';

describe('Service: Dean', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeanService]
    });
  });

  it('should ...', inject([DeanService], (service: DeanService) => {
    expect(service).toBeTruthy();
  }));
});
