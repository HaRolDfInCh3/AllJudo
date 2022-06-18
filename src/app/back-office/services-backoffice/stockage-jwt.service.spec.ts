import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { StockageJwtService } from './stockage-jwt.service';

describe('StockageJwtService', () => {
  let service: StockageJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
      },);
    service = TestBed.inject(StockageJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
