import { TestBed } from '@angular/core/testing';

import { StockageJwtService } from './stockage-jwt.service';

describe('StockageJwtService', () => {
  let service: StockageJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockageJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
