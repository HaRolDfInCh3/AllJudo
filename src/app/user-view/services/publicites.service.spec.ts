import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PublicitesService } from './publicites.service';

describe('PublicitesService', () => {
  let service: PublicitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
      },);
    service = TestBed.inject(PublicitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
