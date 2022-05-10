import { TestBed } from '@angular/core/testing';

import { AuthentificationJWTService } from './authentification-jwt.service';

describe('AuthentificationJWTService', () => {
  let service: AuthentificationJWTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificationJWTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
