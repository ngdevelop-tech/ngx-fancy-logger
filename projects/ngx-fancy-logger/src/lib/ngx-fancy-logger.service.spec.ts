import { TestBed } from '@angular/core/testing';

import { NgxFancyLoggerService } from './ngx-fancy-logger.service';

describe('NgxFancyLoggerService', () => {
  let service: NgxFancyLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxFancyLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
