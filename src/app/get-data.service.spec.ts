import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { createSpyFromClass } from 'jasmine-auto-spies';

import { GetDataService } from './get-data.service';

describe('GetDataService', () => {
  let service: GetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetDataService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    service = TestBed.inject(GetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
