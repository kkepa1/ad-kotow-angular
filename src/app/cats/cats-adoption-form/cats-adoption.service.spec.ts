import { TestBed } from '@angular/core/testing';

import { CatsAdoptionService } from './cats-adoption.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CatsAdoptionService', () => {
  let service: CatsAdoptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CatsAdoptionService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
