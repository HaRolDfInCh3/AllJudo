import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ChampionsService } from './champions.service';

describe('ChampionsService', () => {
  let service: ChampionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
      },);
    service = TestBed.inject(ChampionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
