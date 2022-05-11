import { TestBed } from '@angular/core/testing';

import { AuthentificationAdminJWTService } from './authentification-admin-jwt.service';

describe('AuthentificationJWTService', () => {
  let service: AuthentificationAdminJWTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthentificationAdminJWTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
