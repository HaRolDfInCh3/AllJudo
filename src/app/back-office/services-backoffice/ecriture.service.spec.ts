import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EcritureService } from './ecriture.service';

describe('EcritureService', () => {
  let service: EcritureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
      },);
    service = TestBed.inject(EcritureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
