import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ClubsService } from './clubs.service';

describe('ClubsService', () => {
  let service: ClubsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
      },);
    service = TestBed.inject(ClubsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
